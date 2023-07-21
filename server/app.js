const express = require("express");
//const loginForm = require("../models/LoginModel");
const connect = require("./db/mongo");
//const form = require("../models/formModel.js");
const cors = require("cors");
const userRoutes = require('./router/userRoutes')
const requestRoutes = require('./router/requesterRoutes')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.use("/",userRoutes)
app.use("/",requestRoutes)

app.listen(8000, () => {
  connect();
  console.log("port connected");
});
