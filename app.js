const express = require("express");
var Twocheckout = require("2checkout-node");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up on port " + port);
  console.log("hello");
});

app.use(express.json());

// Pass in your private key and seller ID
var tco = new Twocheckout({
  apiUser: "APIuser1817037", // Admin API Username, required for Admin API bindings
  apiPass: "APIpass1817037", // Admin API Password, required for Admin API bindings
  sellerId: "seller-id1068674", // Seller ID, required for all non Admin API bindings
  privateKey: "private-key 5DEE8C34-4C35-9BE9-03091A26BBFC", // Payment API private key,
  secretWord: "secret-word7s47ADUYzUUQWw%%Av8JW8wtMeq6-", // Secret Word,

  demo: false, // Set to true if testing response with demo sales
  sandbox: true, // Uses 2Checkout sandbox URL for all bindings
});

//Sample Test
const params = {
  mode: "2CO",
  li_0_name: "Cart#3747384837",
  li_0_price: "3500.00",
  first_name: "Zohaib",
  last_name: "Khan",
  email: "anikamanzoorali_391@yahoo.com",
  address1: "TCS office, Shewa Adda, Tehsi Razzar, City and District Swabi",
  address2: "",
  phone: "0335 9084499",
  country: "Pakistan",
  city: "Swabi",
  state: "Swabi",
  zip: "23430",
  qty: "1",
  currency_code: "PKR",
};

var link = tco.checkout.link(params);
console.log("Link:", link);

//Rest Api for creating checkout url
app.post("/order", (req, res) => {
  try {
    let data = {
      ...req.body,
    };

    console.log("Data:", data);

    // Get a URL encoded payment link
    var link = tco.checkout.link(data);
    console.log("Link:", link);
    let result = {
      status: 200,
      message: "Checkout URL Created Successfully!",
      url: link,
    };

    res.send(result);
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: "Server Error Occurred.",
      error,
    });
  }
});
