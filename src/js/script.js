
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

        console.log(values);
      });
    });

    // Search Filter logic -
    inputValue.addEventListener("input", () => {
      cardContainer.innerHTML = "";
      const searchFilter = fetchData.filter((find) => {
        // console.log(find.name.toLowerCase().includes(inputValue.value.toLowerCase()));
        return find.name.toLowerCase().includes(inputValue.value.toLowerCase());
      });

      console.log(searchFilter.length);
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
window.addEventListener("pageshow", () => {
  addToCartId = JSON.parse(localStorage.getItem("addCart")) || [];
  addToCart.classList.add("bgGreen");
  addToCart.textContent = addToCartId.length;
  if (addToCartId.length === 0) {
    addToCart.textContent = "";
    addToCart.classList.remove("bgGreen");
  }
});

function addTwoCart() {
  const addBtn = document.querySelectorAll(".addButton");
  const itemAddedToast = document.querySelector(".itemAddedToast");
  let intervalID = null;
  addBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      if (addToCartId.includes(el.dataset.id)) {
        if (intervalID) return;
        intervalID = setTimeout(() => {
          itemAddedToast.classList.add("hidden");
          intervalID = null;
        }, 2000);
        return itemAddedToast.classList.remove("hidden");
      }

      addToCartId.push(e.currentTarget.dataset.id);
      localStorage.setItem("addCart", JSON.stringify(addToCartId));
      addToCart.classList.add("bgGreen");
      addToCart.textContent = addToCartId.length;
    });
  });
}
