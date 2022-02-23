const Razorpay = require('razorpay');
const RazorpayTransaction = require('../model/transaction');
// const Wallet = require('../model/wallet');
// const { walletAmount } = require('./wallet');


const razorpayInstance = new Razorpay({
  key_id:"rzp_test_pSj0nl03uMrhJU",

  key_secret:"IkVT0dtLyUwaIckOk6ysh3kV",
});

const createOrder =   (req, res) => {
  currency = "INR";
  const { amount } = req.body;

    razorpayInstance.orders.create({amount, currency}, 
        (err, order)=>{
          
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
}

const verifyOrder =  async (req, res) => {
  const { order_id, payment_id,amount } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];
    await RazorpayTransaction.save({
      orderId:order_id,paymentId:payment_id,amount:amount
    })
  const key_secret = process.env.key_secret;

  let hmac = crypto.createHmac("sha256", key_secret);

  hmac.update(order_id + "|" + payment_id);

  const generated_signature = hmac.digest("hex");

  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: "Payment has been verified" });
  } else res.json({ success: false, message: "Payment verification failed" });
};

module.exports = { createOrder, verifyOrder };
