import { getLocalStorage, setLocalStorage, qs, renderListWithTemplate } from "./utils.mjs";
import { updateCartIcon } from "./Cart.mjs";

export default class ProductDetails {
    constructor(dataSource, productID) {
        this.productID = productID;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productID);
        // once we have the product details we can render out the HTML
        //this.renderProductDetails("main");
        renderListWithTemplate(productTemplate, qs("main"), [this.product])
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById("addToCart")
                .addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        let products = []; // init cart array
        if (localStorage.getItem("so-cart")) {
            //if contents in previous array
            products = getLocalStorage("so-cart"); //add old contents to array
        }
        products.push(this.product); // add new content to array
        setLocalStorage("so-cart", products); //push to storage
        
        //update the cart icon bubble text
        updateCartIcon(products.length);
    }

    // renderProductDetails(selector) {
    //     const element = qs(selector);
    //     element.insertAdjacentHTML("afterBegin", productTemplate(this.product));
    // }
}

function productTemplate(item) {
    return `<section class="product-detail">
    <h3>${item.Brand.Name}</h3>
    <h2 class="divider">${item.Name}</h2>
    <img
      class="divider"
      src="${item.Image}"
      alt="${item.Name}"
    />
    <p class="product-card__price">${item.FinalPrice}</p>
    <p class="product__color">${item.Colors[0].ColorName}</p>
    <p class="product__description">
        ${item.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${item.Id}">Add to Cart</button>
    </div>
    </section>`
}