import {
  // getLocalStorage,
  // renderListWithTemplate,
  qs,
  loadHeaderFooter,
} from "./utils.mjs";
import { initCartIcon } from "./Cart.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// show number of items in cart on the cart icon in header
loadHeaderFooter(null, initCartIcon);

const cart = new ShoppingCart("so-cart", qs(".product-list"));
cart.init();
