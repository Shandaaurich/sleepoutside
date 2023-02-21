import ProductData from "./ProductData.mjs";
import SearchBar from "./Search.mjs";
import { qs, getParams, setClick } from "./utils.mjs";

const category = getParams("category");


const products = new ProductData();
const listElement = qs(".search-list");

const list = new SearchBar(category, products, listElement);

setClick("#searchForm", list.init());




