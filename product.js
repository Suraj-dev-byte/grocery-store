
const miniImg = document.querySelectorAll('.miniImg')
const mainImg = document.querySelector('.mainImg img');
const params = new URLSearchParams(window.location.search);
const productName = document.querySelector('.productName')
const productPrice = document.querySelector('.price')
const productRating = document.querySelector('.rating')
const productDescription = document.querySelector('.productDescrip')
const id = params.get('id')


async function api() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('faild to fetch')
    }
    const data = await response.json();
    const product = data.data.products.find(item => item.id == id);
    productCard(product)

  } catch (error) {
    console.log(error);
  }
}

api()

function productCard(val) {
  console.log(val);
  miniImg.forEach((el) => {
    el.src = val.images[0]
  })
  mainImg.src = val.images[0]
  productName.textContent = val.name;
  productPrice.textContent = `MRP ₹${val.mrp}`
  productRating.textContent = val.rating.toFixed(1)

}