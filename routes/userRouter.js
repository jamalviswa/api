const express = require('express')
const router = express.Router()


const {createUser,loginUser, getUser, updateUser, getAllUsers, getUsersByTime, getSpecificUsers, getAdminUsers, countUsers} = require('../controller/user')


router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUser)
router.route('/update/:id').put(updateUser)
router.route('/users/done').get(getAllUsers)
router.route('/users/usersPaginate').get(getUsersByTime)
router.route('/users/specific').get(getSpecificUsers)
router.route('/admin/done').get(getAdminUsers)
router.route('/users/count').get(countUsers)


module.exports= router