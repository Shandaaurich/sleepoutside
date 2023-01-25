import { getParams } from "./utils.mjs";
import { initCartIcon } from "./Cart.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// show number of items in cart on the cart icon in header
initCartIcon();

const dataSource = new ProductData("tents");
const productID = getParams("product");
const product = new ProductDetails(dataSource, productID);
product.init();
