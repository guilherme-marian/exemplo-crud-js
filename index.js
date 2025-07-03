const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'controleEstoque'
});

connection.connect (function(err) {
    if(err) {
        console.error("Error: ", err);
        return;
    }
    else {
        console.log("Ok Connection");
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.post('/cadastrar', (req, res) => {
    const produto = req.body.nome;
    const quantidade = req.body.quantidade;
    const preco = req.body.preco;

    const insert = 
        'INSERT INTO produtos (produto, quantidade, preco) VALUES (?, ?, ?)';
    connection.query(insert, [produto, quantidade, preco], (err, results) => {
        if(err){
            console.error("Error to insert product: ", err);
            res.status(500).send("Error to register the product");
            return;
        }
        else {
            console.log("Product was insert with success!");
        }
    })
});

app.listen(3000, () => {
    console.log('Server running http://localhost:3000');
});