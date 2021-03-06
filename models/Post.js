const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
}

Post.init(
    {
        // unique id of the post
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // text for the post title
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // text for the pst content
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // user that made the post
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
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;