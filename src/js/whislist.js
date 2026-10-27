
const mainContainer = document.querySelector('.mainContainer')


async function api() {

  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("faild to fetch");
    }
    const data = await response.json();


    const products = data.data.products
    products.forEach((product) => {
      console.log(product);
      wishlistProducts(product)
    })

  } catch (error) {
    console.log(error);
  }
}

api();

function wishlistProducts(product) {
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('wishlist-card')
  // Top Discount -
  const discountDiv = document.createElement('div');
  const span = document.createElement('span');
  discountDiv.append(span)
  discountDiv.classList.add('wishlist-top-row')
  span.classList.add('wishlist-discount-badge')
  span.textContent = '-50%'


  // product Image -
  const imgDiv = document.createElement('div');
  const img = document.createElement('img');
  imgDiv.append(img)
  imgDiv.classList.add('wishlist-image-box')
  img.classList.add('wishlist-product-img')
  img.src = product.images[0]
  // product Details -

  const productDiv = document.createElement('div');
  const productName = document.createElement('h3');
  const productQuantity = document.createElement('p');
  productDiv.append(productName, productQuantity)
  productDiv.classList.add('wishlist-details')
  productName.classList.add('wishlist-title')
  productQuantity.classList.add('wishlist-quantity')

  productName.textContent = product.name
  productQuantity.textContent = product.quantity
  // price & Add and Remove button

  const priceDiv = document.createElement('div');
  const productPrice = document.createElement('span');
  priceDiv.classList.add('wishlist-bottom-row')
  productPrice.classList.add('wishlist-price')
  productPrice.textContent = `₹${product.mrp}`


  // .....
  const btnDiv = document.createElement('div')
  const adddBtn = document.createElement('button')
  const removeBtn = document.createElement('button')
  btnDiv.classList.add('wishlist-actions')
  adddBtn.classList.add('wishlist-btn-add')
  removeBtn.classList.add('wishlist-btn-remove')

  adddBtn.textContent = 'ADD'
  removeBtn.textContent = 'Remove'
  btnDiv.append(adddBtn, removeBtn)
  priceDiv.append(productPrice, btnDiv)

  innerDiv.append(discountDiv, imgDiv, productDiv, priceDiv)
  mainContainer.append(innerDiv)
  console.log(mainContainer);
}

