const loginForm = require("./../models/LoginModel");
const jwt = require("jsonwebtoken");
const createSend = require('./../utilities/jwtUtils')



//signup
exports.signup = async (req, res) => {
  try {
    const newUser = await loginForm.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    console.log(newUser);
    createSend(newUser,200,res)
  } catch (err) {
    res.status(409).json({
      error: err.message,
      message: "user already exists",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Extract email and password from request body

    const user = await loginForm.findOne({ email }).select("+password"); // Find user by email and retrieve the password field

    if (!user || !(await user.validatePassword(password, user.password))) {
      // If user does not exist or the provided password does not match the stored password
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email or password",
      });
    }

    console.log(user); // Log the user object for debugging purposes

    createSend(user,200,res)
  } catch (err) {
    // If an error occurs during the login process
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};

//verify function is working properly
exports.verify = (req, res, next) => {
  try {
    let token;
    //token is not present
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ status: "failed", message: "please login to continue" });
    }
    //split between bearer and jwt token
    if (req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({error: "Invalid token"})
    }
    //token verification
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
      return res.status(403).json({ status: "failed", message: "forbidden" });
    }
    if (!verified.role) {
      return res.status(403).json({ status: "failed", message: "No role found in the token" });
    }

    req.user = verified;
   // console.log('User Role:', req.user.role); // Log the user's role for debugging

    // console.log(req.user) for debugging purposes
    next();
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};

exports.restrict = (...role) => {
  return (req, res, next) => {
    // console.log('User Role:', req.user.role); for debugging purposes
   // console.log('Allowed Roles:', role); // Log the user's role for debugging
    if (!role.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      next();
    }
  };
};
