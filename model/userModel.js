const {sequelize, Sequelize:{DataTypes}} = require('../helper/sequelizeConnection');


const user = sequelize.define("users",{
    firstname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    createdate : {
        type : DataTypes.DATE,
        defaultValue : Date.now()
    }
},{tablename:'users'});


const product = sequelize.define("products",{
    category : {
        type : DataTypes.STRING,
        allowNull : false
    },
    price : {
        type : DataTypes.NUMBER,
        allowNull : false
    },
    model : {
        type : DataTypes.STRING,
        allowNull : false
    },
    company : {
        type : DataTypes.STRING,
        allowNull : false
    },
    createdate : {
        type : DataTypes.DATE,
        defaultValue : Date.now()
    }
},{tablename:'products'});



module.exports = {
    user,
    product    
}