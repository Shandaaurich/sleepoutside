import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

var products = new ProductData("tents");

var listElement = document.querySelector(".product-list");

var list = new ProductListing("tents", products, listElement) ;

list.init();