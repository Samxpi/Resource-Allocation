const express = require('express')
const router = express.Router()
const loginControl = require('../controller/loginController')

router.route('/signup').post(loginControl.signup)
router.route('/login').post(loginControl.login)
router.route('/forget-Password').post(loginControl.verify,loginControl.forgotPassword)
router.route('/reset-Password').post(loginControl.verify,loginControl.resetPassword)

module.exports = router