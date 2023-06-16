const mongoose = require("mongoose");
const db_link =
  "mongodb+srv://Admin:56T7R3QQyz2YwVHJ@react-login.rkpbxzc.mongodb.net/resourceAlloc?retryWrites=true&w=majority";

mongoose
  .connect(db_link)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("Failed");
  });

module.exports = mongoose;
