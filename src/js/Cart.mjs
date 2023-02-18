import { getLocalStorage, qs } from "./utils.mjs";

// initialize cart icon bubble on page load
export function initCartIcon() {
    if (localStorage.getItem("so-cart")) {
        //if contents in cart, then display how many in a bubble next to the cart icon
        var products = getLocalStorage("so-cart");
        let numberOfItems = getLocalStorage("numberOfItems");
        if (numberOfItems > 0) {
            updateCartIcon(numberOfItems);
            qs(".cart").classList.add("bubble");
        }
    } else {
        //if no contents in cart, then put a zero in the bubble
        updateCartIcon("0");
        qs(".cart").classList.remove("bubble");
    }
}

export function updateCartIcon(totalAmount) {
    qs(".cart a").dataset.totalitems = totalAmount;
    qs(".cart").classList.add("bubble");
}