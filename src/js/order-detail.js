

const params = new URLSearchParams(window.location.search);
let getOrders = JSON.parse(localStorage.getItem('orders')) || {}
const orderId = Number(params.get("id"));
const itemContainer = document.querySelector(".itemContainer");
let cartId = JSON.parse(localStorage.getItem("addCart"));
const orderIdDiv = document.querySelector('.orderId')
const orderDate = document.querySelector('.orderDate')
orderIdDiv.textContent = orderId


const selectOrder = getOrders.find((el) => {
  return el.orderId === orderId
})

getOrders.forEach((el) => {
  const [date] = el.PlacedAt.split(', ')
  const [day, month, year] = date.split('/');
  const formatterdData = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  orderDate.textContent = `Placed On ${formatterdData}`
})
// console.log(getOrders);
async function api() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();



    const filterProduct = data.data.products.filter((products) => {
      return selectOrder.cardIds.includes(products.id)
    })
    const getProductPrice = data.data.products.filter((products) => {
      return cartId.includes(products.id)
    })
    totalAddCart(getProductPrice)

    filterProduct.forEach((el) => {
      placedItem(el)

    })


  } catch (error) {
    console.log(error);
  }
}


api();

function placedItem(productInfo) {


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
  paragraphOne.textContent = selectOrder.cardQuantity[productInfo.id] || 1;
  const paragraphTwo = document.createElement("p");
  paragraphTwo.classList.add("innerDivOne-p");
  paragraphTwo.textContent = `₹${productInfo.mrp} / unit`;


  const innerDivTwo = document.createElement("div");
  innerDivTwo.classList.add("innerDivTwo");
  const quantitySpan = document.createElement("span");
  quantitySpan.classList.add("quantitySpan");
  quantitySpan.textContent = `Qty: ${selectOrder.cardQuantity[productInfo.id] || 1}`;



  const priceSpan = document.createElement("span");
  priceSpan.classList.add("priceSpan");
  priceSpan.textContent = `₹${productInfo.mrp}`;
  innerDivOne.append(h3, paragraphOne, paragraphTwo);
  innerDivTwo.append(quantitySpan, priceSpan);
  mainDiv.append(img, innerDivOne, innerDivTwo);
  itemContainer.append(mainDiv);

}


function totalAddCart(cartItem) {
  // console.log(cartItem);
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