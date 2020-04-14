'use-strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                notEmpty: {
                    msg: 'Please enter a value for a title',
                },
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                notEmpty: {
                    msg: 'Please enter a value for a author',
                },
            },
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                notEmpty: {
                    msg: 'Please enter a value for a genre',
                },
            },
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { 
                notEmpty: {
                    msg: 'Please enter a value for a year',
                },
            },
        },
    }, 
    {
        paranoid: true,
        sequelize 
    });

    return Book;
}
