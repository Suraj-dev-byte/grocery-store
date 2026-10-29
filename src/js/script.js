
const cardContainer = document.querySelector(".cardContainer");
const loadingScreen = document.querySelector(".Loading");
const secondBody = document.querySelector(".secondBody");
const inputValue = document.querySelector(".inputValue");
const formEvent = document.querySelector(".formBtn");
const mainContainerTwo = document.querySelector(".mainContainerTwo");
const filterContainer = document.querySelectorAll('.filteringDiv input')


function headingAnimation() {
  const mainHeading = document.querySelector('.heading')
  let wordList = ['Fresh Groceries,'];
  let listWord = 0;
  let wordLetter = 0;
  let reverseType = false;

  setInterval(() => {
    const current = wordList[listWord];

    if (!reverseType) {
      wordLetter++;
    } else {
      wordLetter--;
    }

    mainHeading.innerText = current.slice(0, wordLetter);

    if (wordLetter === current.length) {
      reverseType = true;
    }

    if (wordLetter === 0 && reverseType) {
      reverseType = false;
      listWord = (listWord + 1) % wordList.length;
    }

  }, 200);
}
headingAnimation()

let fetchData = [];
let searchData = [];
async function apiCall() {
  loadingScreen.classList.remove("hidden");
  secondBody.classList.add("hidden");

  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("Faild to fetch data");
    }
    const data = await response.json();

    fetchData = data.data.products;
    const elements = fetchData.slice(0, 12)
    // filtering logic -
    filterContainer.forEach((el) => {
      el.addEventListener('change', () => {
        cardContainer.innerHTML = '';

        const values = Array.from(filterContainer)
          .filter((input) => input.checked)
          .map((input) => input.value.toLowerCase());

        const filtering = fetchData.filter((fl) => {
          return (
            values.length === 0 ||
            values.some((value) =>
              fl.name.toLowerCase().includes(value)
            )
          );
        });


        filtering.forEach((product) => {

          card(product);
        });


      });
    });

    // Search Filter logic -
    inputValue.addEventListener("input", () => {
      cardContainer.innerHTML = "";
      const searchFilter = fetchData.filter((find) => {
        // console.log(find.name.toLowerCase().includes(inputValue.value.toLowerCase()));
        return find.name.toLowerCase().includes(inputValue.value.toLowerCase());
      });


      if (searchFilter.length === 0) {
        cardContainer.classList.add("noResult");
        cardContainer.innerHTML = `
           No Result Found
                <i class="fa-regular fa-face-frown"></i>

                `;
      }
      searchFilter.forEach((el) => {
        card(el);
      });
    });
    formEvent.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputVal = inputValue.value.trim();
      if (inputVal.length < 3) return;

      window.location.href = "search.html?query=" + inputVal;
    });

    elements.forEach((el) => {
      card(el);
      cardTwo(el);
    });
    hideLoading();
    addTwoCart();
    wishlistCart()
  } catch (error) {
    setTimeout(() => {
      hideLoading();
      errorMessage();
    }, 2000);
    console.log(error);
  }

}


apiCall();

function hideLoading() {
  loadingScreen.classList.add("hidden");
  secondBody.classList.remove("hidden");
}

function errorMessage() {
  const btn = document.createElement("button");
  secondBody.classList.add("bodyClass");
  secondBody.textContent =
    "Please check your internet connection and try again.";
  btn.classList.add("reloadBtn");
  btn.textContent = "⟳";
  secondBody.append(btn);
  btn.addEventListener("click", () => {
    apiCall();
    secondBody.textContent = "";
  });
}

function card(val) {
  const innerContainer = document.createElement("div");
  innerContainer.classList.add("innerContainer");
  const div = document.createElement("div");
  div.classList.add("class");
  div.dataset.id = val.id;
  const img = document.createElement("img");
  img.classList.add("imgClass");
  img.src = val.images[0];
  const p = document.createElement("p");
  p.classList.add("paragraph");
  p.textContent = val.name;
  div.append(img);
  innerContainer.append(div, p);
  cardContainer.append(innerContainer);

  div.addEventListener("click", () => {
    window.location.href = `product.html?id=${val.id}`;
  });
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
  const buttonDiv = document.createElement('div')
  buttonDiv.classList.add('buttonDiv')
  const li = document.createElement('li')
  li.classList.add("fa-solid", "fa-heart");
  li.classList.add('wishlist')
  li.dataset.id = valTwo.id
  const button = document.createElement("button");
  button.className = "addButton";
  button.textContent = "ADD";
  button.dataset.id = valTwo.id;
  buttonDiv.append(li, button)
  imageContainer.append(image);
  bottom.append(price, buttonDiv);
  card.append(discount, imageContainer, title, quantity, bottom);
  mainContainerTwo.append(card);

  imageContainer.addEventListener("click", () => {
    window.location.href = `product.html?id=${valTwo.id}`;
  });
}

function carousel() {
  const rightArrow = document.querySelector(".rightArrow");
  const lefttArrow = document.querySelector(".leftArrow");

  rightArrow.addEventListener("click", () => {
    cardContainer.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  });

  lefttArrow.addEventListener("click", () => {
    cardContainer.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  });
}

carousel();

// save addToCart in LocalStorage..
const addToCart = document.querySelector(".addToCart");
let addToCartId = JSON.parse(localStorage.getItem("addCart")) || [];
let addWishlistId = JSON.parse(localStorage.getItem("addCartWishlist")) || [];
window.addEventListener("pageshow", () => {
  addToCartId = JSON.parse(localStorage.getItem("addCart")) || [];
  addToCart.classList.add("bgGreen");
  addToCart.textContent = addToCartId.length;
  if (addToCartId.length === 0) {
    addToCart.textContent = "";
    addToCart.classList.remove("bgGreen");
  }
});





function wishlistCart() {

  const wishlist = document.querySelectorAll(".wishlist");
  const itemAddedToast = document.querySelector(".itemAddedToast");
  const toastMessage = document.querySelector(".toastMessage");

  wishlist.forEach((el) => {
    if (addWishlistId.includes(el.dataset.id)) {
      el.style.color = 'red'
    }
  })

  let intervalID = null;
  wishlist.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (addWishlistId.includes(el.dataset.id)) {
        if (intervalID) return;
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add("hidden");
          intervalID = null;
        }, 2000);
        itemAddedToast.classList.remove("hidden");
        toastMessage.classList.add('text-orange-500');

        return toastMessage.textContent = 'item already in Wishlist'
      } else {
        clearTimeout(intervalID)
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add('hidden')
          intervalID = null
        }, 2000);
        itemAddedToast.classList.remove('hidden')
        toastMessage.classList.remove('text-orange-500');
        toastMessage.textContent = 'Added in Wishlist ❤️'
        el.style.color = 'red'

      }


      addWishlistId.push(e.currentTarget.dataset.id);
      localStorage.setItem("addCartWishlist", JSON.stringify(addWishlistId));
      addToCart.classList.add("bgGreen");
      addToCart.textContent = addWishlistId.length;

    });
  });
}


function addTwoCart() {

  const addBtn = document.querySelectorAll(".addButton");
  const itemAddedToast = document.querySelector(".itemAddedToast");
  const toastMessage = document.querySelector(".toastMessage");


  let intervalID = null;
  addBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (addToCartId.includes(el.dataset.id)) {
        if (intervalID) return;
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add("hidden");
          intervalID = null;
        }, 2000);
        itemAddedToast.classList.remove("hidden");
        toastMessage.classList.add('text-orange-500');

        return toastMessage.textContent = 'item already added'
      } else {
        clearTimeout(intervalID)
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add('hidden')
          intervalID = null
        }, 2000);
        itemAddedToast.classList.remove('hidden')
        toastMessage.classList.remove('text-orange-500');
        toastMessage.textContent = 'item added'

      }


      addToCartId.push(e.currentTarget.dataset.id);
      localStorage.setItem("addCart", JSON.stringify(addToCartId));
      addToCart.classList.add("bgGreen");
      addToCart.textContent = addToCartId.length;
    });
  });
}
