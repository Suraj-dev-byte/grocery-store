const params = new URLSearchParams(window.location.search);
const mainContainerTwo = document.querySelector(".mainContainerTwo");
const addToCart = document.querySelector(".addToCart");
let addTwoCount = localStorage.getItem("addTwoCart");
let addToCartId = JSON.parse(localStorage.getItem("addCart")) || [];
if (addTwoCount > 0) {
  addToCart.textContent = addTwoCount;
  addToCart.classList.add("bgGreen");
}
const id = params.get("id");

async function api() {

  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();
    const product = data.data.products.find((item) => item.id == id);
    productCard(product);

    const someProduct = data.data.products.slice(0, 8);
    someProduct.forEach((el) => {
      cardTwo(el)
    })
    addTwoCart()
  } catch (error) {
    console.log(error);
  }
}

api();

function productCard(val) {
  if (val.offer_price == val.mrp) {
    val.offer_price = 1;
  }
  const miniImg = document.querySelectorAll(".miniImg");
  const mainImg = document.querySelector(".mainImg img");
  const productName = document.querySelector(".productName");
  const productPrice = document.querySelector(".price");
  const productRating = document.querySelector(".rating");
  const productReviews = document.querySelector(".reviews");
  const productQuantity = document.querySelector(".quantity");
  const productDiscount = document.querySelector(".discountOffer");
  const deliveryTime = document.querySelector(".deliveryDuration");
  console.log(productDiscount);
  console.log(val);
  miniImg.forEach((el) => {
    el.src = val.images[0];
  });
  mainImg.src = val.images[0];
  productName.textContent = val.name;
  productPrice.textContent = `MRP ₹${val.mrp}`;
  productRating.textContent = val.rating.toFixed(1);
  productReviews.textContent = `(${val.rating_count} reviews)`;
  productQuantity.textContent = val.quantity;
  productDiscount.textContent = `${Math.floor(((val.mrp - val.offer_price) / 100) * 100)}% Off`;
  deliveryTime.textContent = `Delivery by ${val.platform.sla}`;
}

function cardTwo(valTwo) {
  const card = document.createElement("div");
  card.className = "card";

  const discount = document.createElement("span");
  discount.className = "discount";
  discount.textContent = `-50%`;

  const imageContainer = document.createElement("div");
  imageContainer.className = "imageContainer";

  const image = document.createElement("img");
  image.className = "imgClassTwo";
  image.src = valTwo.images[0];
  image.alt = "Ruplestrime";

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = valTwo.name;

  const quantity = document.createElement("p");
  quantity.className = "quantity";
  quantity.textContent = valTwo.quantity;

  const bottom = document.createElement("div");
  bottom.className = "bottom";

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = `₹${valTwo.mrp}`;

  const button = document.createElement("button");
  button.className = "addButton";
  button.textContent = "ADD";
  button.dataset.id = valTwo.id;

  imageContainer.append(image);
  bottom.append(price, button);
  card.append(discount, imageContainer, title, quantity, bottom);
  mainContainerTwo.append(card);

  imageContainer.addEventListener("click", () => {
    window.location.href = `product.html?id=${valTwo.id}`;
  });
}

function addTwoCart() {
  const itemAddedToast = document.querySelector('.itemAddedToast')
  const addBtn = document.querySelectorAll(".addButton");
  let intervalID = null
  addBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (addToCartId.includes(el.dataset.id)) {
        if (intervalID) return;
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add('hidden')
          intervalID = null
        }, 2000)
        return itemAddedToast.classList.remove('hidden');
      }


      addToCartId.push(e.currentTarget.dataset.id);
      localStorage.setItem("addCart", JSON.stringify(addToCartId));
      addTwoCount++;
      localStorage.setItem("addTwoCart", addTwoCount);
      addToCart.classList.add("bgGreen");
      addToCart.textContent = addTwoCount;
    });
  });

}
