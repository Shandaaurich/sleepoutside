import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let products = [] // init cart array
  if (localStorage.getItem("so-cart")) { //if contents in previous array
    products = getLocalStorage("so-cart") //add old contents to array
  }
  products.push(product) // add new content to array
  setLocalStorage("so-cart", products); //push to storage
}

/*
function removeProductFromCart(product) {} //there should be a way to do this
function clearCart() {} //and this
*/

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
