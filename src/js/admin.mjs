import ExternalServices from "./ExternalServices.mjs";
import {
  alertMessage
} from "./utils.mjs";

function loginFormTemplate() {
  return `<fieldset class = "loginForm">
    <legend>Login</legend>
    <p>
        <label for="email">Email</label>
        <input type= "text" id= "email" placeholder = "Email@Email.com" value="user1@email.com"/>
    </p>
    <p>
        <label for="password">Password</label>
        <input type= "password" id= "password" placeholder = "SecretPassword"/>
    </p>
    <button type="submit" id = "loginButton"> Login!</button>
    </fieldset>;
    `
}

function orderTemplate() {
    return `<h2>Submitted Orders</h2>
    <table id="orders">
    <thead>
    <tr><th>ID</th><th>Date</th><th>State</th><th>Item Count</th><th>Order Total</th>
    </thead>
    <tbody class= "order-body"></tbody>
    </table>
    `;
}

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    // I built the login method with a callback: next. 
    // This makes it much more flexible...
    // there could be many different things the user wants to do after logging in...
    // this allows us that flexibility without having to write a bunch of login methods
    try {
      this.token = await this.services.loginRequest(creds);
      next()
    } catch (err) {
      // remember this from before?
      alertMessage(err.message.message);
    }
  }
  showlogin() {
    this.mainElement.innerHTML = loginFormTemplate();
    document.querySelector("#loginButton").addEventListener("click", (e) => {
      const email = document.querySelector("#email").value;
      const password = document.querySelector("#password").value
      this.login({
        email: email,
        password: password
      }, this.showOrders.bind(this))
    });

  };
  async showOrders() {

    try {
      const orders = await this.services.getOrders(this.token);
       this.mainElement.innerHTML = orderTemplate();
      const parent = document.querySelector("#orders tbody");
      parent.innerHTML = orders 
         .map(
            (order) =>
            `<tr>
            <td>${order.id}</td>
            <td>${new Date(order.orderDate).toLocaleDateString("en-US")}</td>
            <td>${order.state}</td>
            <td>${order.items.length}</td>
            <td>${order.orderTotal}</td>
            </tr>
            `
        )
        .join("");
    }catch (err){
      console.log(err);
    }
  }
}
