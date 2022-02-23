const express = require('express')
const app = express()
const dotenv = require('dotenv')
const Razorpay = require("razorpay");
const driverRouter = require('./routes/driverRouter')
const userRouter = require('./routes/userRouter')
const rideRequestRouter = require('./routes/rideRequestRouter')
const carRouter = require('./routes/carRouter')
const sequelize = require('./db/dbsql')
const helmet = require('helmet')
const Wallet = require('./model/wallet')
const User = require('./model/usermodel')
const RideRequest = require('./model/ridemodel')
const Driver = require('./model/drivermodel')
const Car = require('./model/carmodel')
const walletTransaction = require('./model/walletTransaction')
const Transaction = require('./model/transaction')
const walletRouter = require('./routes/walletRouter')
const razorpayRouter = require('./routes/razorPayRouter');
const RazorpayTransaction = require('./model/transaction');
dotenv.config()
app.use(express.json())



app.use(helmet())
User.hasOne(Wallet)
User.hasMany(Transaction)
User.hasMany(RideRequest)
Driver.hasMany(Transaction)
User.hasMany(walletTransaction)
RideRequest.belongsTo(User)
Driver.hasMany(RideRequest)
Driver.hasOne(Car)
Car.hasMany(Driver)
Car.belongsTo(Driver)
Wallet.belongsTo(User)
RazorpayTransaction.belongsTo(Wallet)
Wallet.hasMany(RazorpayTransaction)
sequelize.sync().then(()=>{
console.log('mysql connected')
}).catch(err=>{
  console.log(err)
})

app.use('/api/v1/users',userRouter)
app.use('/api/v1/drivers',driverRouter)
app.use('/api/v1/riderequest',rideRequestRouter)
app.use('/api/v1/cars',carRouter)
app.use('/api/v1/wallet',walletRouter)
app.use('/api/v1/razorPay',razorpayRouter)
app.listen(5500, ()=>{
  console.log('server is running on port 3000')
})