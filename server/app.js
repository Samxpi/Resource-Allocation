const express = require("express");
//const loginForm = require("../models/LoginModel");
const connect = require("./db/mongo");
//const form = require("../models/formModel.js");
const cors = require("cors");
const routes = require('./router/reqRoutes')
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());


app.use("/",routes)

app.listen(8000, () => {
  connect();
  console.log("port connected");
});
