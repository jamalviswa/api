const express = require('express')

const router = express.Router()
const { createCar, getAllCars } = require('../controller/car')

router.route('/createCar').post(createCar)
router.route('/allCars').get(getAllCars)


module.exports = router