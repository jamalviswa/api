const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')
const Wallet = require('./wallet')

const User = sequelize.define('user',{
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
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },


})
module.exports= User