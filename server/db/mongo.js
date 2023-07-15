const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connect to Database')
  } catch (error) {
    throw(error);
  }
};
mongoose.connection.on('disconnect',() => {
  console.log('Disconnect from Database');
})

module.exports = connect;