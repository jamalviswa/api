const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')

const walletTransaction = sequelize.define('walletTransaction',{

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
    orderId:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
    PaymentId:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
    },
  },
  
);

module.exports = walletTransaction