import { initCartIcon } from "./Cart.mjs";
import { loadHeaderFooter, alertRegister } from "./utils.mjs";

//call header and footer from the template
loadHeaderFooter(null, initCartIcon);

//call newsletter alert message from the template
alertRegister();

