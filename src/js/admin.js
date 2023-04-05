import Admin from "./admin.mjs";
import { initCartIcon } from "./Cart.mjs";
import { qs, loadHeaderFooter } from "./utils.mjs";

const outputSelector = qs("#loginForm");

loadHeaderFooter(null, initCartIcon);

const myAdmin = new Admin(outputSelector);

myAdmin.showlogin();
