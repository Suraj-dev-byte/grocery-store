

const query = new URLSearchParams(window.location.search).get('query')
const cardContainer = document.querySelector('.mainContainerTwo')
const inputValue = document.querySelector(".inputValue");
const formEvent = document.querySelector(".formBtn");
console.log(query);
const searchQueryMessage = document.getElementById('search-query-display')
searchQueryMessage.innerHTML = `Search results for  ${query} <i class="fa-regular fa-face-laugh text-black"></i>`



async function api() {

  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();
    const filterVal = data.data.products.filter((el) => {
      return el.name.toLowerCase().includes(query.toLowerCase())
    })


    inputValue.addEventListener('input', () => {
      cardContainer.innerHTML = ''
      const searchFilter = filterVal.filter((el) => {
        return el.name.toLowerCase().includes(inputValue.value.toLowerCase())
      })



      if (searchFilter.length === 0) {
        searchQueryMessage.innerHTML = `
     No Result Found
          <i class="fa-regular fa-face-frown"></i>
        `
      }
      searchFilter.forEach((val) => {
        searchQueryMessage.innerHTML = `Search results for  ${query} <i class="fa-regular fa-face-laugh text-black"></i>`
        console.log(searchQueryMessage);
        // cardContainer.classList.remove('noResult')
        cardTwo(val)
        addTwoCart()

      })





    })
    formEvent.addEventListener("submit", (e) => {
      e.preventDefault();

    });

    filterVal.forEach((el) => {
      cardTwo(el)
    })
    addTwoCart()
  } catch (error) {
    console.log(error);
  }
}

api();

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
  button.dataset.id = valTwo.id

  imageContainer.append(image);
  bottom.append(price, button);
  card.append(discount, imageContainer, title, quantity, bottom);
  cardContainer.append(card)

  imageContainer.addEventListener('click', () => {
    window.location.href = `product.html?id=${valTwo.id}`
  })


}

const addToCart = document.querySelector(".addToCart");
let addToCartId = JSON.parse(localStorage.getItem("addCart")) || [];
if (addToCartId.length > 0) {
  addToCart.textContent = addToCartId.length;
  addToCart.classList.add("bgGreen");
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
      addToCart.classList.add("bgGreen");
      addToCart.textContent = addToCartId.length;
    });
  });

}