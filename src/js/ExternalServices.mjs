// BYUI/local Login
const baseURL = "http://server-nodejs.cit.byui.edu:3000/"
//External Site login
//const baseURL = "https://wdd330-backend.onrender.com/"

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data};
  }
}
function sortByProperty(property){  
  return function(a,b){  
     if(a[property] > b[property])  
        return 1;  
     else if(a[property] < b[property])  
        return -1;  
 
     return 0;  
  }  
}



var sort = "NameWithoutBrand";

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    data.Result.sort(sortByProperty(sort));
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(json) {
    const thingToSend = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    };

    const response = await fetch (baseURL + `checkout`, thingToSend)
    const data = await convertToJson(response);
    return data.Result;
  }

  async loginRequest(creds){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds),
    };
    const response = await fetch(baseURL + "login", options).then(
      convertToJson
    );
    return response.accessToken;
  }
  async getOrders(token){
    const options = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };
    const response = await fetch(baseURL + "orders", options).then(
      convertToJson
    );
    return response;
  }
}
