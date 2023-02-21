import { initCartIcon } from "./Cart.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter, qs } from "./utils.mjs";
// import ExternalServices from "./ExternalServices.mjs";

//call header and footer from the template
loadHeaderFooter(null, initCartIcon);

const key = "so-cart";

// const dataSource = new ExternalServices();
const checkout = new CheckoutProcess(key, qs("html"));

checkout.init();
checkout.calculateOrderSummary();

qs("#submitCheckout").addEventListener("click", (e) => {
  e.preventDefault();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) checkout.checkout();
});
