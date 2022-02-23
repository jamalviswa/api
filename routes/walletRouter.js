const express = require('express')

const router = express.Router()
const {addMoneyToTheWallet, walletTransfer, walletAmount} = require("../controller/wallet");


router.route('/addMoneyWallet/:id').post(addMoneyToTheWallet)
router.route('/walletTransfer/:id').patch(walletTransfer)
router.route('/walletAmount/:id').get(walletAmount)


module.exports = router