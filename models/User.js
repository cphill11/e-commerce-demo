const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create User model so that it inherits Model class functionality
class User extends Model {}

// define table columns and config, initialize the model's data & config
User.init(
    {
        // table column definitions 
        id: {
            // use Sequelize DataTypes objects to provide what type of data it is
            type: DataTypes.INTEGER,
            // make not null
            allowNull: false,
            //indiate primary key
            primaryKey: true,

            // turn on autoincrement
            autoIncrement: true
        },

        // username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,

            // prevent duplicate emails
            unique: true,

            // w/ allowNull set to fall, run data through validators prior to creating table 
            validate: {
                isEmail: true
            }
        },

        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // set minimum password character length
                len: [6]
            }
        }
    },
    {
        // hooks are added to 2nd object for User.init
        hooks: {
            // set up beforeCreate() lifecycle "hook" functionality", passing in userData object that contains plaintext password
            // also pass in saltRoute value of 10
            async beforeCreate(userData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
            
            // set up beforeUpdate() lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        
        // table config options start
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