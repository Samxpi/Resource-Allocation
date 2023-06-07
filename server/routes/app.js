const express = require("express");
const loginForm = require("../routes/mongo.js");
const form = require("../models/formModel.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  let loginData = new loginForm(req.body);
  let email = req.body.email;
  let password = req.body.password;
  try {
    const check = await loginForm.findOne({ email: email,password:password });
    const check1 = await loginForm.findOne({ password: password });

    if (check) {
      res.json("exist");
    } else if (!check1) {
      res.json("Wpass");
    } else {
      res.json("notexist");
    }
  } catch {
    res.json("notexist"); 
  }
});

app.post('/home', async (req,res)=>{
  const newForm = new form(req.body);
  try{
    const savedForm = await newForm.save();
    res.status(200);
    console.log(savedForm);
  }catch(e){
    res.status(500).json(e)
  }
})

app.listen(8000, () => {
  console.log("port connected");
});
