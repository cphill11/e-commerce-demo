const { Model, DataTypes } = require('sequelize');

// should this be ('../config/connection.js') (?)
const sequelize = require('../config/connection');

// create User model
class User extends Model {}

// define table columns and config
User.int(
    {
        // talbel column definitions will go here
    },
    {
        // table config options will go here

        // pass in imported sequelize connection / direct connection to db
        sequelize,

        // stop automatic creation of createdAt/ updatedAt timestamp fields
        timestamps: false,

        // don't pluralize name of db table
        freezeTableName: true,

        // use underscores (not camelcase)
        underscored: true,

        // change model name to lowercase in db
        modelName: 'user'
    }
);

module.exports = User;