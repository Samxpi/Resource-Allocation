const express = require("express");
const loginData = require("../routes/mongo");
const formData = require("../models/formModel.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);  
  try {
    const check = await loginData.findOne({ email: email,password:password });
    const check1 = await loginData.findOne({ password: password });
    window.log(check);
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


// app.post("/home",(req,res)=>{
//   const newFormData = new formData(req.body);
    
//   newFormData.save((err,doc)=>{
//     if(err) return console.log(err);
//     console.log(doc); 
//   });
// })

app.listen(8000, () => {
  console.log("port connected");
});
