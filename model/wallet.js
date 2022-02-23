const Sequelize = require('sequelize')
const sequelize = require ('../db/dbsql');


const Wallet = sequelize.define("wallet", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    balance: { type: Sequelize.INTEGER, default: 0 },
    
});

module.exports = Wallet