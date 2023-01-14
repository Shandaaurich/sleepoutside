import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let items = [];
  if (getLocalStorage("so-cart")){
    items = getLocalStorage("so-cart");
  }
  console.log(items);
  items.push(product);
  console.log(items);
  setLocalStorage("so-cart", items);
  
  
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
