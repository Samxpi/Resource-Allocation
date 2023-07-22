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
    passwordResetToken:{
      type: String,
      select: false
    },
    passwordResetExpires: {
      type: Date,
      select: false
    },
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
loginSchema.methods.resetPassToken = async function(){
  const reset = crypto.randomBytes(6).toString('hex')
  this.passwordResetToken = crypto.createHash('sha256').update(reset).digest('hex')
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000
  console.log(reset)
  console.log(this.passwordResetToken)
  return reset
}

  const loginData = mongoose.model("collections", loginSchema);

  module.exports = loginData;