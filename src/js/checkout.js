import { initCartIcon } from "./Cart.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

//call header and footer from the template
loadHeaderFooter(null, initCartIcon);

const key = 'so-cart';

const dataSource = new ExternalServices();
const checkout = new CheckoutProcess(key, qs('html'))

checkout.init();
checkout.calculateOrderSummary();

qs('#submitCheckout').addEventListener("click", (e) => {
    e.preventDefault();

    checkout.checkout();
})