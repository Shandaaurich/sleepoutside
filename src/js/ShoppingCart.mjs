import { getLocalStorage, qs } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

let cartTotal = 0;

function renderCartContents() {
  // const cartItems = getLocalStorage("so-cart");
  const cartItems = getLocalStorage("so-cart");

  if (cartItems == null || cartItems <= 0) {
    // if cart empty display emptyness
    const htmlItems = cartEmptyTemplate();
    qs(".product-list").innerHTML = htmlItems;
  } else if (cartItems != null) {
    // else if not empty display cart contents
    renderListWithTemplate(cartItemTemplate, qs(".product-list"), cartItems);
      
    //remove items from cart on click
    removeItems();

    // display total
    qs(".cart-total").innerHTML = `Cart Total: $<strong>${cartTotal.toFixed(2)}</strong>`;
  }
}

function cartEmptyTemplate() {
  // TODO: make this look better
  const noItems = `<li class="cart-card divider">
  <img 
    alt="Your cart is empty!"
  />
  <h2 class="card__name">There's nothing here...</h2>
  <p class="cart-card__color">Shop today's deals now!</p>
  <p class="cart-card__quantity">qty: :-)</p>
  <p class="cart-card__price">$---.--</p>
</li>`;
  return noItems;
}

function cartItemTemplate(item) {

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">quantity: ${item.quantity}</p>
    <a href="./index.html">
    <span class="cart-card__delete" data-id="${item.Id}">remove</span>
    </a>
    <p class="cart-card__price">$${item.FinalPrice * item.quantity}</p>
  </li>`;
  cartTotal += (item.FinalPrice * item.quantity);
  return newItem;
}

function removeItems() {
  const selectRemoveLinks = document.querySelectorAll(".cart-card__delete");
  
  for (let link of selectRemoveLinks) {

    //attach a listener to each remove link
    link.addEventListener("click", function(e) {
      
      //pull the Id of the item to be removed
      const currentArticle = e.currentTarget;
      let itemId = currentArticle.dataset.id
      
      //pull the contents of the cart from local storage  
      let cartContents = JSON.parse(localStorage.getItem("so-cart"));

      //remove the appropriate item      
      let itemIndex = cartContents.findIndex(item => item.id === itemId);
      cartContents.splice(itemIndex, 1);

      //Clear cart contents
      qs(".product-list").innerHTML = "";
      //set local storage with list after splice
      localStorage.setItem("so-cart", JSON.stringify(cartContents));
      //pull down the contents of the new local storage
      let newCart = getLocalStorage("so-cart");
      //re-render the cart list
      renderListWithTemplate(cartItemTemplate, qs(".product-list"), newCart);
      
    });
    
  };
    
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  init() {
    //render cart
    renderCartContents();
  }

  renderCartContents() {
    const cartItems = getLocalStorage(this.key);

    if (cartItems == null || cartItems == []) {
      // if cart empty display emptyness
      const htmlItems = cartEmptyTemplate();
      this.parentSelector.innerHTML = htmlItems;
    } else if (cartItems != null) {
      // else if not empty display cart contents
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      this.parentSelector.innerHTML = htmlItems.join("");

      // display total
      qs(".cart-total").innerHTML = `Cart Total: $<strong>${cartTotal}</strong>`;
    }
    

  }

}
