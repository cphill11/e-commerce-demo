// call Sequelize connection function from library
const Sequelize = require('sequelize');

// create connection to db, passing in MySQL info for username & password
// new Sequelize() fxn accepts db name, MySQL username, and MySQL password as parameters
const sequelize = new Sequelize('e_commerce_demo_db', 'username', 'password', {

    // pass in configuration settings
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

// export the connection
module.exports = sequelize;
