import { getParams, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { initCartIcon } from "./Cart.mjs";

const dataSource = new ProductData("tents");
const productID = getParams("product");
const product = new ProductDetails(dataSource, productID);
product.init();

loadHeaderFooter(null, initCartIcon)