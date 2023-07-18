const loginForm = require("./../models/LoginModel");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

//signup
exports.signup = async (req, res) => {
  try {
    const newUser = await loginForm.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    console.log(newUser);
    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
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

    const token = signToken(user._id); // Generate a token for the authenticated user

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    // If an error occurs during the login process
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};

// route protect
exports.protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      throw new Error('Login required for access');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new Error('Access Denied');
      }
      
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
      message: "Unauthorized",
    });
  }
};


