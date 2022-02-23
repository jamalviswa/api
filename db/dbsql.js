const Sequelize = require('sequelize')

const sequelize = new Sequelize("bookit-backend",  {
  dialect: "mysql",
  host: "localhost",
});


module.exports = sequelize







