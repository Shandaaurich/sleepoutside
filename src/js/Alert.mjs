import alertData from "../public/json/alerts.json";

export default class Alert {
  constructor() {
    this.dataSource = alertData;
  }

  renderAlertDetails() {
    //select the main element of the page and prepend the alert sections to it
    const element = document.querySelector("main");
    element.prepend(alertTemplate(this.dataSource));
  }
}

function alertTemplate(dataSource) {
  //if the dataSource has contents then create a section with class "alert-list"
  const alertSection = document.createElement("section");
  alertSection.classList.add("alertSection");
  //loop throught tresults and build a p for each alert. Apply the background and foreground colors specified in the alerts.json file
  dataSource.forEach((alertMessage) => {
    const alertP = document.createElement("p");
    alertP.innerText = alertMessage.message;
    alertP.style.backgroundColor = alertMessage.background;
    alertP.style.color = alertMessage.color;
    alertSection.appendChild(alertP);
  });
  return alertSection;
}
