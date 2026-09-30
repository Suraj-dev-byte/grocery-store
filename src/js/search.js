const query = new URLSearchParams(window.location.search).get('query')
const cardContainer = document.querySelector('.mainContainerTwo')
console.log(cardContainer);
console.log(query);

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
    if (filterVal.length === 0) {
      cardContainer.classList.add('noResult')
      cardContainer.innerHTML = `
   No Result Found
        <i class="fa-regular fa-face-frown"></i>
      `
    }
    filterVal.forEach((el) => {
      cardTwo(el)
    })
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