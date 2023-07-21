const express = require('express')
const router = express.Router()
const loginControl = require('../controller/loginController')

router.route('/signup').post(loginControl.signup)
router.route('/login').post(loginControl.login)
// router.route('/forgetPass').post(loginControl.verify,loginControl.forgotPassword)

module.exports = router