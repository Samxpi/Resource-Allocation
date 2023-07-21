const mongoose = require("mongoose") 
const validator = require("validator")
const bcrypt = require("bcryptjs")
const crypto = require('crypto')
const loginSchema = mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, 'a password must be at least 8 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['admin','approver','requester'],
      default: 'requester'
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  });


  loginSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password,10)
    this.passwordConfirm = undefined;
    next()
})
loginSchema.methods.validatePassword = async function(candidatePassword,userPassword){
  return bcrypt.compare(candidatePassword,userPassword)
}


  const loginData = mongoose.model("collections", loginSchema);

  module.exports = loginData;