
const params = new URLSearchParams(window.location.search);
let getOrders = JSON.parse(localStorage.getItem('orders')) || {}
const orderId = Number(params.get("id"));
const itemContainer = document.querySelector(".itemContainer");
let cartId = JSON.parse(localStorage.getItem("addCart"));
const orderIdDiv = document.querySelector('.orderId')
const orderDateElement = document.querySelector('.orderDate')
const orderProgress = document.querySelector('.orderProgress')



const selectOrder = getOrders.find((el) => {
  return el.orderId === orderId
})

getOrders.forEach((el) => {
  dateAndProgressBar(el)
})
function dateAndProgressBar(orderDate) {
  orderIdDiv.textContent = orderId
  const OMID = document.querySelector('.oM-Id')
  OMID.textContent = `#OM-${orderId}`
  const placedDate = orderDate.PlacedAt
  const placedTime = new Date(orderDate.PlacedAt).getTime();
  const date = new Date(placedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  orderDateElement.textContent = `Placed On ${formattedDate}`


  const elapsedTime = Date.now() - placedTime;
  const elapseMinutes = elapsedTime / (1000 * 60);
  const percentage = Math.min((elapseMinutes / 40) * 100, 100)
  orderProgress.style.width = `${percentage}%`
  console.log(percentage);
}




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


    filterProduct.forEach((el) => {
      placedItem(el)

    })
    totalAddCart(filterProduct)


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