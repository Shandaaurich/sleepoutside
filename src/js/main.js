import { initCartIcon } from "./Cart.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";

//call header and footer from the template
loadHeaderFooter(null, initCartIcon);

// show the list of products
var products = new ProductData("tents");
var listElement = qs(".product-list");
var list = new ProductListing("tents", products, listElement);
list.init();
