const mongoose = require("mongoose");
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

const newSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collections", newSchema);

module.exports = collection;
