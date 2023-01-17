
export default class Alerts {
  constructor() {
    //read alerts.js file
    // let alerts = require("../json/alerts.json");
    // console.log(alerts);
    getData() {
        return fetch("../json/alerts.json")
          .then(convertToJson)
          .then((data) => data);
          return data;
      }

    //create a <section class="alert-list>
    let alertSection = document.createElement("section");
    alertSection.className = "alert-list";

    //loop through the results and create a <p> for each alert
    for (let alert of alerts) {
      let alertP = document.createElement("p");
      alertP.innerHTML = alert.message;

      //apply background & foreground colors
      alertP.style.backgroundColor = alert.backgroundColor;
      alertP.style.color = alert.foregroundColor;

      //append <p> to <section>
      alertSection.appendChild(alertP);
    }

    //prepend <section> to main element
    document.getElementById("main").prepend(alertSection);
  }
}