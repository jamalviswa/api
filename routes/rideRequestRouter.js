const express = require('express')
const router = express.Router()
const  {createRideRequest, getRideRequests} = require('../controller/rideRequest')





router.route('/createRideRequest').post(createRideRequest)
router.route('/rideRequests').get(getRideRequests)



module.exports= router