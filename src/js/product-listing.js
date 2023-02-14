import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { qs, getParams } from "./utils.mjs";

const category = getParams("category");

// show the list of products
var products = new ExternalServices();
var listElement = qs(".product-list");
var titleElement = qs(".title");
var title = category.toString();
title = title[0].toUpperCase() + title.slice(1);
titleElement.textContent = title;

var list = new ProductListing(category, products, listElement);
list.init();
