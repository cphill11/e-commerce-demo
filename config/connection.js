// call Sequelize connection function from library
const Sequelize = require('sequelize');

// allow app to get or set values in the config directory; allows for hiding of private data
require('dotenv').config();

// create connection to db; new Sequelize() fxn accepts db name, MySQL username, and MySQL password as parameters
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {

    // pass in configuration settings
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

// export the connection
module.exports = sequelize;
