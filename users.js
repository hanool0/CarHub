// var car = require("car");
// var passportLocalCar = require("passport-local-car");

// var UserSchema = new car.Schema({
//   username: String,
//   password: String,
//   email: String,
//   isAdmin: {type: Boolean, default: false}
// });

// UserSchema.plugin(passportLocalCar)

// module.exports = car.model("User", UserSchema);

const request = require('request');

var model = 'camry'
request.get({
  url: 'https://api.api-ninjas.com/v1/cars?model=' + model,
  headers: {
    'X-Api-Key': 'yiR+VnnJGsxdG7Tc8bsQ1A==6KNGDh3zIXneFKSd'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else console.log(body) })
