const express = require('express')
const router = express.Router()
const formControl = require('../controller/formController')



router.route('/home').post(formControl.forms)
router.route('/home/:id').delete(formControl.deleteForm)
router.route('/approver').post(formControl.sortForm)

module.exports = router