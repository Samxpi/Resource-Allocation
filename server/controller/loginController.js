const loginForm = require("./../models/LoginModel");
const jwt = require("jsonwebtoken");
const createSend = require("./../utilities/jwtUtils");
const sendEmail = require("../utilities/email");
const crypto = require('crypto')

//signup
exports.signup = async (req, res) => {
  try {
    const newUser = await loginForm.create({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    console.log(newUser);
    createSend(newUser, 200, res);
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

    createSend(user, 200, res);
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
      return res.status(401).json({ error: "Invalid token" });
    }
    //token verification
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
      return res.status(403).json({ status: "failed", message: "forbidden" });
    }
    if (!verified.role) {
      return res
        .status(403)
        .json({ status: "failed", message: "No role found in the token" });
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
      res.status(403).json({ message: "Forbidden" });
    } else {
      next();
    }
  };
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await loginForm.findOne({ email });
    if (!user)
      return res.status(404).json({ status: "fail", message: "Bad request" });
    const resetToken = await user.resetPassToken();
    await user.save({ validateBeforeSave: false });
    // const resetUrl = `${req.protocol}://${req.get('host')}/resetPass/${}`
    const message = `Here is your password reset token ${resetToken}.\nUse this to reset your password`;
    try {
    const mailOptions = {
      from: "resourcemsg@outlook.com",
      to: user.email,
      subject: "Password Reset token",
      text: message,
    };
    await sendEmail(mailOptions);

    res.status(200).json({ status: "success" });
    } catch (e) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      res.status(404).json({ status: "fail", message: "Bad request" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Internal server error",
    });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the user with the provided reset token
    const user = await loginForm.findOne({
      passwordResetToken: crypto.createHash('sha256').update(token).digest('hex'),
      passwordResetExpires: { $gt: Date.now() }, // Check if the token has not expired
    });

    if (!user) {
      return res.status(400).json({ status: 'fail', message: 'Invalid or expired token' });
    }

    // Update the user's password and clear the reset token fields
    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Save the updated user document
    await user.save();

 
    res.status(200).json({ status: 'success', message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: 'Internal server error',
    });
  }
};
