import { getLocalStorage, qs } from "./utils.mjs"

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = []; //list of products in cart cookie
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary()
    }

    calculateItemSummary() {
        for (item in this.list) {
            this.itemTotal += item["FinalPrice"];
        }
        
        //display total items
        qs('#itemsTotal').innerHTML = this.list.length;
        qs('#orderSubtotal').innerHTML = this.itemTotal;
    }

    calculateOrderSummary() {
        this.shipping = 10 + 2 * (this.list.length - 1);
        this.tax = (this.itemTotal + this.shipping) * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        qs('#shippingTotal').innerHTML = this.shipping;
        qs('#taxTotal').innerHTML = this.tax;
        qs('#totalTotal').innerHTML = this.orderTotal;
    }
}
