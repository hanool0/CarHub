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

// const axios = require('axios');

// var model = 'camry'
// function getData(input) {
//   var results;
//   axios.defaults.headers['X-API-KEY'] = 'yiR+VnnJGsxdG7Tc8bsQ1A==6KNGDh3zIXneFKSd';
//   axios.get('https://api.api-ninjas.com/v1/cars?model=' + model).then(res => results = res.data).catch(err => console.log(err))
//   results = JSON.stringify(results)
//   console.log(results)
//   return results;
// }
// module.exports = { getData }

const request = require('request');
const axios = require('axios');

async function getCar(model) {
  const url = 'https://api.api-ninjas.com/v1/cars';
  const apiKey = 'yiR+VnnJGsxdG7Tc8bsQ1A==6KNGDh3zIXneFKSd';
  
   // Corrected variable name
  try {
    const response = await axios.get(url, {
      params: { model }, // Correctly passing model as a parameter
      headers: { 'X-Api-Key': apiKey },
    });
    
    // For debugging purposes
    
    if (response.status !== 200) {
      throw new Error(`Status Code car body: ${response.status}`);
    }

    const data = response.data;
    if (data.length === 0) {
      throw new Error('No car data found for the given model.');
    }

    const {
      make,
      year,
      city_mpg,
      combination_mpg,
      highway_mpg,
      cylinders,
      displacement,
      drive,
    } = data[0];

    const carModel = data[0].model;
    
    return {
      make,
      year,
      city_mpg,
      combination_mpg,
      highway_mpg,
      cylinders,
      displacement,
      drive,
      model: carModel
    };
  } catch (error) {
    console.error('Car body error occurred:', error); // Improved error logging
  }
}
module.exports = getCar