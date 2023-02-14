import { getParams, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { initCartIcon } from "./Cart.mjs";

const dataSource = new ExternalServices("tents");
const productID = getParams("product");
const product = new ProductDetails(dataSource, productID);
product.init();

loadHeaderFooter(null, initCartIcon);
