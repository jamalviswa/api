const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')

const RazorpayTransaction = sequelize.define('transaction',{

    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
      type: Sequelize.STRING,
      allowNull:false
      
    },
    email: {
      type: Sequelize.STRING,
      allowNull:false
      
    },
    phone: {
      type: Sequelize.STRING,
      allowNull:false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    OrderId:{
      type: Sequelize.STRING,
      allowNull:false
    },
    PaymentId:{
      type:Sequelize.STRING,
      allowNull:false
    },
  },
  
);

module.exports = RazorpayTransaction
