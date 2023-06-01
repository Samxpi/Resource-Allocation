const mongoose = require("mongoose");
const loginData = require("../models/LoginModel.js")
const DB =
  "mongodb+srv://Admin:56T7R3QQyz2YwVHJ@react-login.rkpbxzc.mongodb.net/resourceAlloc?retryWrites=true&w=majority";

mongoose
  .connect(DB)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Failed");
  });


module.exports = loginData;
