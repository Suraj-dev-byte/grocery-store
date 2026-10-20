const quantity = JSON.parse(localStorage.getItem("quantity")) || {};
let cartId = JSON.parse(localStorage.getItem("addCart"));
const itemContainer = document.querySelector(".itemContainer");
const orderId = document.querySelector('.orderId')
let getOrders = JSON.parse(localStorage.getItem('orders')) || {}
const container = document.querySelector('.container')
// console.log(getOrders);
// console.log('hello');
async function api() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();



    const orderMap = getOrders.map((el) => {
      return el.cardIds
    })

    const allOrdersData = orderMap.map((ids) => {
      return data.data.products.filter((product) => {
        return ids.includes(product.id)
      })
    })
    allOrdersData.forEach((el) => {
      buildOrderCard(el, getOrders)
    })

  } catch (error) {
    console.log(error);
  }
}

api();






function buildOrderCard(val, order) {
  const thumbBox = document.createElement('div');
  val.forEach((el) => {
    const img = document.createElement('img');
    img.classList.add('item-img');
    img.src = el.images[0];
    img.alt = 'Milk';
    thumbBox.appendChild(img);
  })


  // Main Card Wrapper
  const ordersContainer = document.getElementById('ordersContainer');

  // 1. Root Card div
  const card = document.createElement('div');
  card.classList.add('order-card');
  // ================= 1. Top Section =================
  const topRow = document.createElement('div');
  topRow.classList.add('order-top-row');

  // Top Left
  const topLeft = document.createElement('div');
  topLeft.classList.add('order-top-left');

  const iconBox = document.createElement('div');
  iconBox.classList.add('order-icon-box');
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-hourglass-half');
  iconBox.appendChild(icon);

  const titleWrap = document.createElement('div');


  const metaInfo = document.createElement('div');
  order.forEach((el) => {
    const orderId = document.createElement('span');
    orderId.textContent = el.orderId
    metaInfo.appendChild(orderId);
  })
  titleWrap.appendChild(metaInfo);
  orderId.classList.add('order-id');

  metaInfo.classList.add('order-meta-info');

  const badge = document.createElement('span');
  badge.classList.add('order-badge');

  const pulseDot = document.createElement('span');
  pulseDot.classList.add('pulse-dot');
  const statusText = document.createTextNode('Processing');

  badge.appendChild(pulseDot);
  badge.appendChild(statusText);

  metaInfo.appendChild(badge);

  const timeText = document.createElement('p');
  timeText.classList.add('order-time');
  timeText.textContent = 'Ordered today at 2:14 PM';


  titleWrap.appendChild(timeText);

  topLeft.appendChild(iconBox);
  topLeft.appendChild(titleWrap);

  // Top Right
  const topRight = document.createElement('div');
  topRight.classList.add('order-top-right');

  const amountLabel = document.createElement('span');
  amountLabel.classList.add('amount-label');
  amountLabel.textContent = 'Total amount';

  const amountValue = document.createElement('span');
  amountValue.classList.add('amount-val');
  amountValue.textContent = '$24.50';

  topRight.appendChild(amountLabel);
  topRight.appendChild(amountValue);

  topRow.appendChild(topLeft);
  topRow.appendChild(topRight);

  // ================= 2. Middle Section =================
  const midRow = document.createElement('div');
  midRow.classList.add('order-mid-row');

  // Image Box
  const itemsWrap = document.createElement('div');
  itemsWrap.classList.add('order-items-wrap');


  thumbBox.classList.add('item-thumb-box');



  const hoverTitle = document.createElement('div');
  hoverTitle.classList.add('item-hover-title');
  hoverTitle.textContent = 'Milk';


  thumbBox.appendChild(hoverTitle);
  itemsWrap.appendChild(thumbBox);

  // Agent Info
  const agentInfo = document.createElement('div');
  agentInfo.classList.add('order-agent-info');

  const countP = document.createElement('p');
  countP.classList.add('items-count');
  countP.textContent = '3 Grocery Items';

  const agentP = document.createElement('p');
  agentP.classList.add('agent-name');
  agentP.textContent = 'Delivery agent: Rahul K.';

  agentInfo.appendChild(countP);
  agentInfo.appendChild(agentP);

  midRow.appendChild(itemsWrap);
  midRow.appendChild(agentInfo);

  // ================= 3. Bottom Section =================
  const bottomRow = document.createElement('div');
  bottomRow.classList.add('order-bottom-row');

  const slotP = document.createElement('p');
  slotP.classList.add('delivery-slot-text');

  const bell = document.createElement('i');
  bell.classList.add('fa-solid', 'fa-bell', 'bell-icon');
  const slotMsg = document.createTextNode('Delivery requested for today (05:00 PM - 07:00 PM)');

  slotP.appendChild(bell);
  slotP.appendChild(slotMsg);

  const link = document.createElement('a');
  link.classList.add('details-link');
  link.href = '#';

  const linkTxt = document.createTextNode('View details ');
  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid', 'fa-arrow-right', 'arrow-icon');

  link.appendChild(linkTxt);
  link.appendChild(arrow);

  bottomRow.appendChild(slotP);
  bottomRow.appendChild(link);

  // ================= Assemble into #ordersContainer =================
  card.appendChild(topRow);
  card.appendChild(midRow);
  card.appendChild(bottomRow);

  ordersContainer.appendChild(card);
}

// function placedItem(productInfo) {
//   orderId.textContent = getOrders[0].orderId
//   // console.log(productInfo.id);
//   const mainDiv = document.createElement("div");
//   mainDiv.classList.add("mainDiv");
//   const img = document.createElement("img");
//   img.classList.add("mainDivImg");
//   img.src = productInfo.images[0];
//   img.alt = productInfo.images[0];

//   const innerDivOne = document.createElement("div");
//   innerDivOne.classList.add("innerDivOne");
//   const h3 = document.createElement("h3");
//   h3.classList.add("innerDivOne-h3");
//   h3.textContent = productInfo.name;

//   const paragraphOne = document.createElement("p");
//   paragraphOne.classList.add("innerDivOne-p");
//   paragraphOne.textContent = quantity[productInfo.id];
//   const paragraphTwo = document.createElement("p");
//   paragraphTwo.classList.add("innerDivOne-p");
//   paragraphTwo.textContent = `₹${productInfo.mrp} / unit`;


//   const innerDivTwo = document.createElement("div");
//   innerDivTwo.classList.add("innerDivTwo");
//   const quantitySpan = document.createElement("span");
//   quantitySpan.classList.add("quantitySpan");
//   quantitySpan.textContent = `Qty: ${quantity[productInfo.id] ?? 1}`;



//   const priceSpan = document.createElement("span");
//   priceSpan.classList.add("priceSpan");
//   priceSpan.textContent = `₹${productInfo.mrp}`;
//   innerDivOne.append(h3, paragraphOne, paragraphTwo);
//   innerDivTwo.append(quantitySpan, priceSpan);
//   mainDiv.append(img, innerDivOne, innerDivTwo);
//   itemContainer.append(mainDiv);

// }


// function totalAddCart(cartItem) {

//   const productAmount = document.querySelector(".amount");
//   const totalDiscount = document.querySelector(".totalDiscount");
//   const totalPrice = document.querySelector(".totalPrice");
//   const priceText = document.querySelector(".itemCount");
//   const priceTotal = cartItem.reduce(
//     (acc, curr) => {
//       acc.mrpTotal += curr.mrp;
//       acc.offerTotal += curr.offer_price;
//       return acc;
//     },
//     {
//       mrpTotal: 0,
//       offerTotal: 0,
//     },
//   );


//   productAmount.textContent = `₹${priceTotal.mrpTotal}`;
//   totalDiscount.textContent = `- ₹${priceTotal.mrpTotal - priceTotal.offerTotal}`;
//   totalPrice.textContent = `₹${priceTotal.mrpTotal - (priceTotal.mrpTotal - priceTotal.offerTotal)}`;
//   priceText.textContent = `Price (${cartId.length} items)`;

// }