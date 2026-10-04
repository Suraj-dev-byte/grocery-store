let cartId = JSON.parse(localStorage.getItem("addCart"));
const addToCart = document.querySelector(".addToCart");
const cartContainer = document.getElementById("cart-items-container");
if (cartId.length > 0) {
  addToCart.classList.add("bgGreen");
  addToCart.textContent = cartId.length
}
let newData = [];


// FIx Add To Count Bug .....


async function api() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();
    const filterData = data.data.products.filter((el) => {
      return cartId.includes(el.id);
    });
    // console.log(filterData);
    newData = data;
    totalAddCart(filterData);
    filterData.forEach((el) => {
      // cartRemoveBtn.addEventListener('click', () => {
      //   console.log('hello');
      // })

      cardTwo(el);
    });
  } catch (error) {
    console.log(error);
  }
}

api();

function cardTwo(valTwo) {
  let timeoutId;
  const maxLimitBox = document.querySelector(".maxLimitBox");

  const discountPercentage = Math.round(
    ((valTwo.mrp - valTwo.offer_price) / valTwo.mrp) * 100,
  );
  // Container card

  // Function to generate Product Card dynamically

  // 1. Main Article Box
  const article = document.createElement("article");
  article.classList.add("cart-item-card");

  // Layout Div
  const layoutDiv = document.createElement("div");
  layoutDiv.classList.add("cart-item-layout");

  // --- IMAGE SECTION ---
  const imgWrapper = document.createElement("div");
  imgWrapper.classList.add("cart-img-wrapper");

  const img = document.createElement("img");
  img.src = valTwo.images[0];
  img.alt = valTwo.images[0];
  img.classList.add("cart-img");
  imgWrapper.appendChild(img);

  // --- DETAILS SECTION ---
  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("cart-details-wrapper");

  const title = document.createElement("h2");
  title.textContent = valTwo.name;
  title.classList.add("cart-title");

  // Rating
  const ratingWrapper = document.createElement("div");
  ratingWrapper.classList.add("cart-rating-wrapper");

  const ratingBadge = document.createElement("span");
  ratingBadge.classList.add("cart-rating-badge");
  ratingBadge.innerHTML = `${valTwo.rating.toFixed(1)} <i class="fa-solid fa-star w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5"></i>`;

  const ratingText = document.createElement("span");
  ratingText.classList.add("cart-rating-text");
  ratingText.textContent = `(${valTwo.rating_count} reviews)`;

  ratingWrapper.appendChild(ratingBadge);
  ratingWrapper.appendChild(ratingText);

  // Price
  const priceWrapper = document.createElement("div");
  priceWrapper.classList.add("cart-price-wrapper");

  const currentPrice = document.createElement("span");
  currentPrice.classList.add("cart-price-current");
  currentPrice.textContent = `₹${valTwo.mrp}`;

  const oldPrice = document.createElement("span");
  const discount = document.createElement("span");
  if (valTwo.mrp === valTwo.offer_price) {
    discount.textContent = "";
  } else {
    oldPrice.classList.add("cart-price-old");
    oldPrice.textContent = `₹${valTwo.offer_price}`;
    discount.classList.add("cart-price-discount");
    discount.textContent = `${discountPercentage}% off`;
  }

  priceWrapper.appendChild(currentPrice);
  priceWrapper.appendChild(oldPrice);
  priceWrapper.appendChild(discount);

  // Append to details
  detailsWrapper.appendChild(title);
  detailsWrapper.appendChild(ratingWrapper);
  detailsWrapper.appendChild(priceWrapper);

  // Append img & details to Layout
  layoutDiv.appendChild(imgWrapper);
  layoutDiv.appendChild(detailsWrapper);

  // --- CONTROLS SECTION (Qty & Remove) ---
  const controlsWrapper = document.createElement("div");
  controlsWrapper.classList.add("cart-controls-wrapper");

  // Quantity Buttons
  const qtyWrapper = document.createElement("div");
  qtyWrapper.classList.add("cart-qty-wrapper");

  const minusBtn = document.createElement("button");
  minusBtn.classList.add("cart-qty-btn", "rounded-l");
  minusBtn.textContent = "-";

  const inputQty = document.createElement("input");
  inputQty.type = "text";
  inputQty.value = "1";
  inputQty.readOnly = true;
  inputQty.classList.add("cart-qty-input");

  const plusBtn = document.createElement("button");
  plusBtn.classList.add("cart-qty-btn", "rounded-r");
  plusBtn.textContent = "+";

  qtyWrapper.appendChild(minusBtn);
  qtyWrapper.appendChild(inputQty);
  qtyWrapper.appendChild(plusBtn);

  // Remove Button
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("cart-remove-btn");
  removeBtn.textContent = "Remove";

  removeBtn.dataset.id = valTwo.id;
  removeBtn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id;

    cartId = cartId.filter((item) => item != id);

    localStorage.setItem("addCart", JSON.stringify(cartId));
    // 4. Cart UI dobara render karo
    const afterRemoveData = newData.data.products.filter((el) => {
      return cartId.includes(el.id);
    });

    cartContainer.innerHTML = "";
    addToCart.textContent = cartId.length
    afterRemoveData.forEach((newVal) => {
      cardTwo(newVal);
    });
  });
  controlsWrapper.appendChild(qtyWrapper);
  controlsWrapper.appendChild(removeBtn);

  // Final Append to Article
  article.appendChild(layoutDiv);
  article.appendChild(controlsWrapper);

  // Append Article to HTML Container
  cartContainer.appendChild(article);

  plusBtn.addEventListener("click", () => {
    if (inputQty.value == 5) {
      if (timeoutId) return;
      maxLimitBox.classList.remove("hidden");
      timeoutId = setTimeout(() => {
        maxLimitBox.classList.add("hidden");
        timeoutId = null;
      }, 2000);
      return;
    }
    inputQty.value++;
  });
  minusBtn.addEventListener("click", () => {
    if (inputQty.value == 0) return;
    inputQty.value--;
  });
  layoutDiv.addEventListener("click", () => {
    window.location.href = `product.html?id=${valTwo.id}`;
  });
}

function totalAddCart(cartItem) {
  const saveMessage = document.querySelector(".saveMessage");
  const productAmount = document.querySelector(".amount");
  const totalDiscount = document.querySelector(".totalDiscount");
  const totalPrice = document.querySelector(".totalPrice");
  const priceText = document.querySelector(".priceText");
  const priceTotal = cartItem.reduce(
    (acc, curr) => {
      acc.mrpTotal += curr.mrp;
      acc.offerTotal += curr.offer_price;
      return acc;
    },
    {
      mrpTotal: 0,
      offerTotal: 0,
    },
  );

  productAmount.textContent = `₹${priceTotal.mrpTotal}`;
  totalDiscount.textContent = `- ₹${priceTotal.offerTotal}`;
  totalPrice.textContent = `₹${priceTotal.mrpTotal}`;
  priceText.textContent = `Price (${cartId.length} items)`;
  saveMessage.textContent = `You will save ₹${priceTotal.mrpTotal - priceTotal.offerTotal} on this order`;
}

// placeOrder logic..

function placeOrderLogic() {
  const placeOrder = document.querySelector(".placeOrder");
  const confirmMessage = document.querySelector(".confirmMessage");
  const mainPage = document.querySelector(".mainPage");

  placeOrder.addEventListener("click", () => {
    placeOrder.disabled = true;
    mainPage.classList.add("hidden");
    confirmMessage.classList.remove("hidden");
  });

  setInterval(() => {
    mainPage.classList.remove("hidden");
    confirmMessage.classList.add("hidden");
  }, 5000);
}

placeOrderLogic();


