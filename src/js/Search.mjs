import { renderListWithTemplate } from "./utils.mjs";

function resultsTemplate(product) {

    const discount = Math.round(product.SuggestedRetailPrice - product.FinalPrice);
    if (discount != 0) {
        var discountHTML =
            `
        <p class="product-card__discount" style="background-color:coral; text-align:center;">Discounted!</p>
        `
    } else {
        discountHTML = "";
    }
    return `<li class="product-card"><a href="/product_pages/index.html?product=${product.Id}"><img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
    /><h3 class="card__brand">${product.Brand.Name}</h3><h2 class="card__name">${product.Name}</h2><p class="product-card__price">$${product.FinalPrice}</p>${discountHTML}</a></li>
    
    `;
}

export default class SearchBar {
    constructor(category, dataSource, listElement) {

        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);

    }
    renderList(list) {
        renderListWithTemplate(resultsTemplate, this.listElement, list);
    }



}

