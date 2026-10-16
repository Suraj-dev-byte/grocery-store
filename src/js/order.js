


const quantity = JSON.parse(localStorage.getItem('quantity')) || [];
const orderQuantity = JSON.parse(localStorage.getItem('OrderQuantity')) || [];
let cartId = JSON.parse(localStorage.getItem("addCart"));
const itemContainer = document.querySelector('.itemContainer')

async function api() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();

    const filteredInfo = data.data.products.filter((el) => {
      return cartId.includes(el.id)
    })
    filteredInfo.forEach((el) => {
      placedItem(el)
    })
  } catch (error) {
    console.log(error);
  }

}

api();



function placedItem(productInfo) {
  localStorage.setItem('OrderQuantity', quantity)
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('mainDiv')
  const img = document.createElement('img');
  img.classList.add('mainDivImg')
  img.src = productInfo.images[0]
  img.alt = productInfo.images[0]
  const innerDivOne = document.createElement('div');
  innerDivOne.classList.add('innerDivOne')
  const h3 = document.createElement('h3');
  h3.classList.add('innerDivOne-h3')
  h3.textContent = productInfo.name
  const paragraphOne = document.createElement('p');
  paragraphOne.classList.add('innerDivOne-p')
  paragraphOne.textContent = productInfo.orderQuantity
  const paragraphTwo = document.createElement('p');
  paragraphTwo.classList.add('innerDivOne-p')
  paragraphTwo.textContent = `₹${productInfo.mrp} / unit`
  const innerDivTwo = document.createElement('div');
  innerDivTwo.classList.add('innerDivTwo')
  const quantitySpan = document.createElement('span');
  quantitySpan.classList.add('quantitySpan')
  quantitySpan.textContent = `Qty: ${quantity}`
  const priceSpan = document.createElement('span');
  priceSpan.classList.add('priceSpan')
  priceSpan.textContent = `₹${productInfo.mrp}`
  innerDivOne.append(h3, paragraphOne, paragraphTwo)
  innerDivTwo.append(quantitySpan, priceSpan)
  mainDiv.append(img, innerDivOne, innerDivTwo)
  itemContainer.append(mainDiv)
  console.log(productInfo);
}