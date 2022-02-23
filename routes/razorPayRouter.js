const express = require('express')
const router = express.Router()
const {createOrder,verifyOrder} = require('../controller/razorPay')

router.route('/createOrder').post(createOrder)
router.route('/verifyOrder').post(verifyOrder)



module.exports = router