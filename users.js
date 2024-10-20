var car = require("car");
var passportLocalCar = require("passport-local-car");

var UserSchema = new car.Schema({
  username: String,
  password: String,
  email: String,
  isAdmin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalCar)

module.exports = car.model("User", UserSchema);