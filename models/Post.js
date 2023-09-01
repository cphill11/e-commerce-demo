// import elements to build Post model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post Model
class Post extends Model {};

Post.init(
    // define Post schema
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    // sequelize uses camelcase by default; make underscored an option
    underscored: true,
    modelName: 'post'
    }
);
module.exports = Post;