// import elements to build Post model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post Model
class Post extends Model {
    //shows that upvote method is based on Post Model (not an instance method
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal(
                          "(SELECT COUNT (*) FROM vote WHERE post.id = vote.post_id)"
                        ),
                        "vote_count",
                      ],
                ]
            })
        })
    }
};

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