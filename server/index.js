const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'homework.c9ozeq4b42xn.eu-central-1.rds.amazonaws.com',
    user     : 'homework',
    password : 'pass1',
    database : 'books',
    port     : '3306'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('Connected...');
})

const app = express();

app.get('/books', (req, res) => {
    let sql = 'SELECT * FROM book_info';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    })
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
})

app.get('/', function(req, res){
    let sql;
    switch (req.query.parameter) {
        case 'id':
            sql = `SELECT * FROM book_info ORDER BY id ${req.query.direction}`;
            break;
        case 'title':
            sql = `SELECT * FROM book_info ORDER BY title ${req.query.direction}`;
            break;
        case 'author':
            sql = `SELECT * FROM book_info ORDER BY author ${req.query.direction}`;
            break;
        case 'class':
            sql = `SELECT * FROM book_info ORDER BY class ${req.query.direction}`;
            break;
        case 'pages':
            sql = `SELECT * FROM book_info ORDER BY pages ${req.query.direction}`;
            break;
    }
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
            res.send(results);
        })
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
});

app.listen('3000', () =>{
    console.log('Server started on port 3000');
});