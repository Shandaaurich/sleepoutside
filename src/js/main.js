import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { initCartIcon } from "./Cart.mjs";
import { qs } from "./utils.mjs";

// show number of items in cart on the cart icon in header
initCartIcon();

// show the list of products
var products = new ProductData("tents");
var listElement = qs(".product-list");
var list = new ProductListing("tents", products, listElement);
list.init();
