
let cartId = JSON.parse(localStorage.getItem("addCart"));
let getOrders = JSON.parse(localStorage.getItem('orders')) || [];
const container = document.querySelector('.container')
const multipleProductPage = document.querySelector('.multipleProduct-Page')
const orderSpecificPage = document.querySelector('.order-SpecificPage')
const emptyPage = document.querySelector('.emptyPage')
const completedOrders = document.querySelector('.completedOrders')
const spentThisMonths = document.querySelector('.spentThisMonth')




async function api() {
  if (getOrders.length === null) {
    emptyPage.classList.remove('hidden')
    multipleProductPage.classList.add('hidden')
    return;
  } else if (!getOrders.length) {
    emptyPage.classList.remove('hidden')
    multipleProductPage.classList.add('hidden')
  }
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
    allOrdersData.forEach((el, index) => {
      buildOrderCard(el, getOrders[index])

    })

  } catch (error) {
    console.log(error);
  }
}

api();


function buildOrderCard(val, order) {
  console.log(val);
  const placedDate = order.PlacedAt
  const date = new Date(placedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })



  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })

  const placedTime = new Date(order.PlacedAt).getTime();
  const elapseMinutes = (Date.now() - placedTime) / (1000 * 60);
  const status = elapseMinutes >= 40 ? "Delivered" : "Processing";






  const thumbBox = document.createElement('div');
  val.forEach((el) => {
    const img = document.createElement('img');
    img.classList.add('item-img');
    img.src = el.images[0];
    img.alt = 'Milk';
    thumbBox.appendChild(img);
  })

  const totalPrice = val.reduce((acc, curr) => {
    return acc + curr.mrp
  }, 0)

  // console.log( );
  spentThisMonths.textContent = `₹${totalPrice}`

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
  if (status == "Delivered") {
    icon.classList.add("fa-solid", "fa-circle-check");
    completedOrders.textContent = `${val.length} items`
  } else {
    icon.classList.add('fa-solid', 'fa-hourglass-half');
  }
  iconBox.appendChild(icon);

  const titleWrap = document.createElement('div');

  const orderId = document.createElement('span');
  const metaInfo = document.createElement('div');
  orderId.textContent = order.orderId


  metaInfo.appendChild(orderId);
  titleWrap.appendChild(metaInfo);
  orderId.classList.add('order-id');

  metaInfo.classList.add('order-meta-info');

  const badge = document.createElement('span');
  badge.classList.add('order-badge');
  badge.textContent = status

  const pulseDot = document.createElement('span');
  pulseDot.classList.add('pulse-dot');
  // const statusText = document.createTextNode('Processing');

  badge.appendChild(pulseDot);
  // badge.appendChild(statusText);

  metaInfo.appendChild(badge);

  const timeText = document.createElement('p');
  timeText.classList.add('order-time');
  timeText.textContent = `Ordered today at ${formattedTime}`;


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
  amountValue.textContent = `₹${totalPrice}`

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
  countP.textContent = `${val.length} Grocery Items`;

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


  const linkTxt = document.createTextNode('View details ');
  const arrow = document.createElement('i');
  arrow.classList.add('fa-solid', 'fa-arrow-right', 'arrow-icon');

  link.appendChild(linkTxt);
  link.appendChild(arrow);

  link.addEventListener('click', () => {
    window.location.href = `order-details.html?id=${order.orderId}`

  })

  bottomRow.appendChild(slotP);
  bottomRow.appendChild(link);

  // ================= Assemble into #ordersContainer =================
  card.appendChild(topRow);
  card.appendChild(midRow);
  card.appendChild(bottomRow);

  ordersContainer.appendChild(card);
}

