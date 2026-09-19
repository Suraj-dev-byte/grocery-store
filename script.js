const cardContainer = document.querySelector('.cardContainer');
const loadingScreen = document.querySelector('.Loading')
const secondBody = document.querySelector('.secondBody')
const inputValue = document.querySelector('.inputValue')


let fetchData = [];
async function apiCall() {
  loadingScreen.classList.remove('hidden')
  secondBody.classList.add('hidden')

  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Faild to fetch data')
    }
    const data = await response.json();
    fetchData = data.data.products;
    const elements = fetchData.slice(0, 12);
    inputValue.addEventListener('input', (e) => {
      e.preventDefault()
      const query = inputValue.value.trim()

      const searchFilter = fetchData.filter((find) => {
        return find.name.toLowerCase().includes(query.toLowerCase())
      })
      console.log(searchFilter);
      searchFilter.forEach((el) => {
        console.log(el);
      })
    })
    elements.forEach((el) => {

      card(el)
      cardTwo(el)
    })
    hideLoading()
    addTwoCart()

  } catch (error) {
    setTimeout(() => {
      hideLoading()
      errorMessage()
    }, 2000)
  }

}

apiCall()

function hideLoading() {
  loadingScreen.classList.add('hidden')
  secondBody.classList.remove('hidden')
}

function errorMessage() {
  const btn = document.createElement('button')
  secondBody.classList.add('bodyClass')
  secondBody.textContent = 'Please check your internet connection and try again.'
  btn.classList.add('reloadBtn')
  btn.textContent = '⟳'
  secondBody.append(btn)
  btn.addEventListener('click', () => {
    apiCall()
    secondBody.textContent = ''
  })

}



function card(val) {

  const innerContainer = document.createElement('div')
  innerContainer.classList.add('innerContainer')
  const div = document.createElement('div');
  div.classList.add('class')
  div.dataset.id = val.id
  const img = document.createElement('img')
  img.classList.add('imgClass')
  img.src = val.images[0]
  const p = document.createElement('p')
  p.classList.add('paragraph')
  p.textContent = val.name
  div.append(img)
  innerContainer.append(div, p)
  cardContainer.append(innerContainer);

  div.addEventListener('click', () => {
    window.location.href = `product.html?id=${val.id}`
  })
}

const mainContainerTwo = document.querySelector('.mainContainerTwo')


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
  mainContainerTwo.append(card)


}



const rightArrow = document.querySelector('.rightArrow')
rightArrow.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: 300,
    behavior: 'smooth'
  })
})

const lefttArrow = document.querySelector('.leftArrow')
lefttArrow.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  })
})

const addToCart = document.querySelector('.addToCart')
let addTwoCount = localStorage.getItem('addTwoCart')
let addToCartId = JSON.parse(localStorage.getItem('addCart')) || []
if (addTwoCount > 0) {
  addToCart.textContent = addTwoCount;
  addToCart.classList.add('bgGreen')
}
function addTwoCart() {
  const addBtn = document.querySelectorAll('.addButton')
  addBtn.forEach((el, i) => {
    el.addEventListener('click', () => {
      if (addToCartId[i] === el.dataset.id) {
        return alert('already added');
      }
      addToCartId.push(el.dataset.id)
      localStorage.setItem('addCart', JSON.stringify(addToCartId));
      addTwoCount++;
      localStorage.setItem('addTwoCart', addTwoCount)
      addToCart.classList.add('bgGreen')
      addToCart.textContent = addTwoCount;
    })

  })
}


