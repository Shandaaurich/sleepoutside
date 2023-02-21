import ProductData from "./ProductData.mjs";
import SearchBar from "./Search.mjs";
import { qs, getParams } from "./utils.mjs";

const searchTerm = getParams("category");

const products = new ProductData();
const listElement = qs(".search-list");

const titleElement = qs(".searchTitle");
let title = searchTerm.toString();
title = title[0].toUpperCase() + title.slice(1);
titleElement.textContent = title;

const list = new SearchBar(searchTerm, products, listElement);

list.init();
