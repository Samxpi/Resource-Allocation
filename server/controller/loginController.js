const loginForm = require("./../models/LoginModel");

exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  try {
    const check = await loginForm.findOne({ email: email, password: password });
    const check1 = await loginForm.findOne({ password: password });
    console.log(check);
    if (check) {
      res.json("exist");
    } else if (!check1) {
      res.json("pass");
    } else {
      res.json("User does not exist");
    }
  } catch {
    res.json("pass");
  }
};
