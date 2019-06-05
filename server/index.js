const express = require('express');
const mysql = require('mysql');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('books', 'homework', 'pass1', {
    host: 'homework.c9ozeq4b42xn.eu-central-1.rds.amazonaws.com',
    dialect: 'mysql'
});

let Books = sequelize.define('book_info',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    class: Sequelize.STRING,
    pages: Sequelize.INTEGER
},
{
    freezeTableName: true,
    timestamps: false
})

const app = express();

app.get('/books', function(req, res){
    let results = [];
    let sql;
    sequelize.sync().then(()=>{       
        if(req.query.parameter){
            sql = Books.findAll({
                order: [
                    [req.query.parameter, req.query.direction]
                ]
            })
        } else {
            sql = Books.findAll()
        }
        sql.then((books)=>{
            for(i = 0; i<books.length; i++)
                results.push(books[i].dataValues);
            res.send(results);
        })
    })
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
});

app.listen('3000', () =>{
    console.log('Server started on port 3000');
});