import { getLocalStorage, renderListWithTemplate, qs } from "./utils.mjs";
import { initCartIcon } from "./Cart.mjs";

// show number of items in cart on the cart icon in header
initCartIcon();

let cartTotal = 0;

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems == null || cartItems == []) {
    // if cart empty display emptyness
    const htmlItems = cartEmptyTemplate();
    qs(".product-list").innerHTML = htmlItems;
  } else if (cartItems != null) {
    // else if not empty display cart contents
    renderListWithTemplate(cartItemTemplate, qs(".product-list"), cartItems);
    // display total
    qs(".cart-total").innerHTML = `Cart Total: $<strong>${cartTotal}</strong>`;
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
  const newItem = `
  <li class="cart-card divider">
  
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <a href="#">
    <span class="cart-card__delete" data-id="${item.Id}">remove</span>
  </a>
  
  <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  cartTotal += item.FinalPrice;
  return newItem;
}

renderCartContents();
