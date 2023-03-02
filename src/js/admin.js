import Admin from "./admin.mjs";
import { initCartIcon } from "./Cart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

//const outputSelector = qs("#loginForm");

loadHeaderFooter(null, initCartIcon);

const myAdmin = new Admin("main");

myAdmin.showlogin();
