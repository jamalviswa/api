const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql')

const Car = sequelize.define('car',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    carName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    carModel:{
        type:Sequelize.STRING,
        allowNull:false
    },
    })
module.exports = Car