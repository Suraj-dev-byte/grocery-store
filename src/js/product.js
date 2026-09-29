const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function api() {

  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();
    const product = data.data.products.find((item) => item.id == id);
    productCard(product);
  } catch (error) {
    console.log(error);
  }
}

api();

function productCard(val) {
  if (val.offer_price == val.mrp) {
    val.offer_price = 1;
  }
  const miniImg = document.querySelectorAll(".miniImg");
  const mainImg = document.querySelector(".mainImg img");
  const productName = document.querySelector(".productName");
  const productPrice = document.querySelector(".price");
  const productRating = document.querySelector(".rating");
  const productReviews = document.querySelector(".reviews");
  const productQuantity = document.querySelector(".quantity");
  const productDiscount = document.querySelector(".discountOffer");
  const deliveryTime = document.querySelector(".deliveryDuration");
  console.log(productDiscount);
  console.log(val);
  miniImg.forEach((el) => {
    el.src = val.images[0];
  });
  mainImg.src = val.images[0];
  productName.textContent = val.name;
  productPrice.textContent = `MRP ₹${val.mrp}`;
  productRating.textContent = val.rating.toFixed(1);
  productReviews.textContent = `(${val.rating_count} reviews)`;
  productQuantity.textContent = val.quantity;
  productDiscount.textContent = `${Math.floor(((val.mrp - val.offer_price) / 100) * 100)}% Off`;
  deliveryTime.textContent = `Delivery by ${val.platform.sla}`;
}
