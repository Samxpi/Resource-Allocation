const express = require('express')
const router = express.Router()
const loginControl = require('./../controller/loginController')
const formControl = require('./../controller/formController')


router.route('/signup').post(loginControl.signup)
router.route('/login').post(loginControl.login)
router.route('/home').post(loginControl.verify,loginControl.restrict('admin','requester'),formControl.forms)
router.route('/home/:id').delete(formControl.deleteForm)
router.route('/approver').post(formControl.sortForm)

module.exports = router