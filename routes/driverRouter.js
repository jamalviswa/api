const express = require('express')
const router = express.Router()

const { createDriver, loginDriver, getDriver, updateDriver, getAllDrivers, getDriversByTime, countDrivers, getPaginatedDrivers } = require('../controller/driver')


router.route('/register').post(createDriver)
router.route('/login').post(loginDriver)
router.route('/:id').get(getDriver)
router.route('/update/:id').put(updateDriver)
router.route('/drivers/all').get(getAllDrivers)
router.route('/driversPaginate').get(getDriversByTime)
router.route('/drivers/count').get(countDrivers)
router.route('/drivers/paginate').get(getPaginatedDrivers)

module.exports= router