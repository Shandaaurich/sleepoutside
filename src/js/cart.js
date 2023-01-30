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

    removeItems();
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

function removeItems() {
  const selectRemoveLinks = document.querySelectorAll(".cart-card__delete");
  
  for (let link of selectRemoveLinks) {

    //attach a listener to each remove link
    link.addEventListener("click", function(e) {
      
      //pull the Id of the item to be removed
      const currentArticle = e.currentTarget;
      let itemId = currentArticle.dataset.id
      console.log(itemId);
      
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
      //update cart icon
      initCartIcon();
    });
    
  };
    
}

renderCartContents();
