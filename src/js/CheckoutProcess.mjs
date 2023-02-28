import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, qs, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs"


const services = new ExternalServices();

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = []; //list of products in cart cookie
        this.itemTotal = 0;
        this.quantity = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage("so-cart");
        this.numberOfItems = getLocalStorage("numberOfItems");
        this.calculateItemSummary()
    }

    calculateItemSummary() {
        for (let item of this.list) {
            this.itemTotal += (item.FinalPrice * item.quantity);
        }
        
        //display total items
        qs("#itemsTotal").innerHTML = this.numberOfItems;
        qs("#orderSubtotal").innerHTML = "$" + this.itemTotal.toFixed(2);
    }

    calculateOrderSummary() {

        this.shipping = 10 + 2 * (this.numberOfItems - 1);
        this.tax = (this.itemTotal + this.shipping) * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        qs("#shippingTotal").innerHTML = "$" + this.shipping.toFixed(2);
        qs("#taxTotal").innerHTML = "$" + this.tax.toFixed(2);
        qs("#totalTotal").innerHTML = "$" + this.orderTotal.toFixed(2);
    }

    async checkout(form) {
        let order = formDataToJSON(qs("#form"));
        order.orderDate = new Date();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping.toFixed(2);
        order.items = packageOrder(this.list);
        // console.log(order)

        //submit
        try {
        const res = await services.checkout(order);
        // console.log(res);
        location.assign("./success.html");
        setLocalStorage("so-cart", []);
        setLocalStorage("numberOfItems", 0);
        } catch (err) {
        removeAllAlerts();

        for (let message in err.message) {
            alertMessage(err.message[message]);
        }
        console.log(err);
        }
    }
}

function packageOrder(items) {
    // build the JSON to POST
    var simplifiedItems = items.map((item) => ({
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity
        }));
    //TODO fix quantity

    return simplifiedItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);

    let JSONfile = {};
    formData.forEach((value, key) => JSONfile[key] = value)
    
    return JSONfile;
    
}
