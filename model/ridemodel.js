const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')


const RideRequest = sequelize.define('rideRequest',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    paymentMethod:{
        type:Sequelize.STRING,
        allowNull:false
    },
   
    dropoffAddress:{
        type:Sequelize.STRING,
        allowNull:false
    },
    
    pickupAddress:{
        type:Sequelize.STRING,
        allowNull:false
    },
  
})

module.exports= RideRequest