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
                notNull: {
                    msg: 'Please  provide a value for title',
                },
                notEmpty: {
                    msg: 'Please enter a value for a title',
                },
            },
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                notNull: {
                    msg: 'Please  provide a value for author',
                },
                notEmpty: {
                    msg: 'Please enter a value for a author',
                },
            },
        },
        genre: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { 
                notNull: {
                    msg: 'Please  provide a value for genre',
                },
                notEmpty: {
                    msg: 'Please enter a value for a genre',
                },
            },
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: { 
                notNull: {
                    msg: 'Please  provide a value for year',
                },
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