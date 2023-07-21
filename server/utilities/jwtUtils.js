// const loginForm = require("./../models/LoginModel");
const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const createSend = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);
  const cookieOptions = {
    // expires:new Date(Date.now(process.env.JWT_COOKIE*24*60*60*1000)),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

module.exports = createSend;
