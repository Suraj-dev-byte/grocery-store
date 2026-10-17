const quantity = JSON.parse(localStorage.getItem("quantity")) || {};
let cartId = JSON.parse(localStorage.getItem("addCart"));
const itemContainer = document.querySelector(".itemContainer");
const orderId = document.querySelector('.orderId')
let storeCard = JSON.parse(localStorage.getItem("storeCard")) || []
const uniqueId = Date.now();

let obj = {
  orderId: uniqueId,
  cardId: cartId,
  cardQuantity: quantity
}
console.log(obj);
async function api() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();

    const filteredInfo = data.data.products.filter((el) => {
      return obj.cardId.includes(el.id);
    });
    totalAddCart(filteredInfo)
    filteredInfo.forEach((el) => {
      placedItem(el);
    });
  } catch (error) {
    console.log(error);
  }
}

api();
localStorage.setItem('storeCard', JSON.stringify(obj))

function placedItem(productInfo) {
  orderId.textContent = obj.orderId

  const mainDiv = document.createElement("div");
  mainDiv.classList.add("mainDiv");
  const img = document.createElement("img");
  img.classList.add("mainDivImg");
  img.src = productInfo.images[0];
  img.alt = productInfo.images[0];

  const innerDivOne = document.createElement("div");
  innerDivOne.classList.add("innerDivOne");
  const h3 = document.createElement("h3");
  h3.classList.add("innerDivOne-h3");
  h3.textContent = productInfo.name;

  const paragraphOne = document.createElement("p");
  paragraphOne.classList.add("innerDivOne-p");
  paragraphOne.textContent = quantity[productInfo.id];
  const paragraphTwo = document.createElement("p");
  paragraphTwo.classList.add("innerDivOne-p");
  paragraphTwo.textContent = `₹${productInfo.mrp} / unit`;


  const innerDivTwo = document.createElement("div");
  innerDivTwo.classList.add("innerDivTwo");
  const quantitySpan = document.createElement("span");
  quantitySpan.classList.add("quantitySpan");
  quantitySpan.textContent = `Qty: ${quantity[productInfo.id] ?? 1}`;



  const priceSpan = document.createElement("span");
  priceSpan.classList.add("priceSpan");
  priceSpan.textContent = `₹${productInfo.mrp}`;
  innerDivOne.append(h3, paragraphOne, paragraphTwo);
  innerDivTwo.append(quantitySpan, priceSpan);
  mainDiv.append(img, innerDivOne, innerDivTwo);
  itemContainer.append(mainDiv);

}


function totalAddCart(cartItem) {

  const productAmount = document.querySelector(".amount");
  const totalDiscount = document.querySelector(".totalDiscount");
  const totalPrice = document.querySelector(".totalPrice");
  const priceText = document.querySelector(".itemCount");
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
  totalDiscount.textContent = `- ₹${priceTotal.mrpTotal - priceTotal.offerTotal}`;
  totalPrice.textContent = `₹${priceTotal.mrpTotal - (priceTotal.mrpTotal - priceTotal.offerTotal)}`;
  priceText.textContent = `Price (${cartId.length} items)`;

}