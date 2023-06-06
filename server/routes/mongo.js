const mongoose = require("mongoose");
const loginData = require("../models/LoginModel.js")
const DB =
  "mongodb+srv://admin:GPnskuWWFcXbJMsv@cluster-0.tbadlvs.mongodb.net/UserLogin?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Failed");
  });


module.exports = loginData;
