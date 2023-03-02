import { initCartIcon } from "./Cart.mjs";
import { loadHeaderFooter, loadNavbar, alertRegister } from "./utils.mjs";

//call header and footer and navBar from the template
loadHeaderFooter(null, initCartIcon);
loadNavbar();

//call newsletter alert message from the template
alertRegister();
