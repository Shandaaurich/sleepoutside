const BYUIbaseURL = "http://server-nodejs.cit.byui.edu:3000/"
const baseURL = "https://wdd330-backend.onrender.com/"

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(json) {
    const thingToSend = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    };

    const response = await fetch (baseURL + `checkout`, thingToSend)
    const data = await convertToJson(response);
    return data.Result;
  }
}
