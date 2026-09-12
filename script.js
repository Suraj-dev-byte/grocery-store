const cardContainer = document.querySelector('.cardContainer');

let fetchData = [];
async function apiCall() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Faild to fetch data')
    }
    const data = await response.json();
    fetchData = data.data.products
    const elements = fetchData.slice(0, 12);
    // console.log(data.data.products);
    elements.forEach((el) => {
      card(el)
      cardTwo(el)

    })
  } catch (error) {
    console.log(error);
  }

}

apiCall()

function card(val) {
  console.log(val);
  const innerContainer = document.createElement('div')
  innerContainer.classList.add('innerContainer')
  const div = document.createElement('div');
  div.classList.add('class')
  const img = document.createElement('img')
  img.classList.add('imgClass')
  img.src = val.images[0]
  const p = document.createElement('p')
  p.classList.add('paragraph')
  p.textContent = val.name
  div.append(img)
  innerContainer.append(div, p)
  cardContainer.append(innerContainer);
}

const mainContainerTwo = document.querySelector('.mainContainerTwo')
console.log(mainContainerTwo);

function cardTwo(valTwo) {
  const card = document.createElement("div");
  card.className = "card";

  const discount = document.createElement("span");
  discount.className = "discount";
  discount.textContent = `-50%`;

  const imageContainer = document.createElement("div");
  imageContainer.className = "imageContainer";

  const image = document.createElement("img");
  image.className = "imgClass";
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

  imageContainer.append(image);
  bottom.append(price, button);
  card.append(discount, imageContainer, title, quantity, bottom);
  mainContainerTwo.append(card)
}

const rightArrow = document.querySelector('.rightArrow')
const lefttArrow = document.querySelector('.leftArrow')
console.log(cardContainer);

rightArrow.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: 300,
    behavior: 'smooth'
  })
})
lefttArrow.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  })
})