const express = require("express");
const loginData = require("../routes/mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await loginData.findOne({ email: email,password:password });
    const check1 = await loginData.findOne({ password: password });
    
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


app.listen(8000, () => {
  console.log("port connected");
});
