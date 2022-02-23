const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')

const Driver = sequelize.define('driver',{
   id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phoneNumber:{
        type:Sequelize.BIGINT(11),
        allowNull:false,
        primaryKey:true
    },

   
   })
module.exports = Driver