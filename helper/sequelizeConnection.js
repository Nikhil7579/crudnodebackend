const Sequelize = require("sequelize");

const sequelize = new Sequelize('next_shop', 'root', '', {
    host: 'localhost',
    dialect : "mysql",
    define : {
        timestamps : false
    },
    logging : false
  });



  module.exports = {
    sequelize, Sequelize
  };