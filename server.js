const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const categories = require('./app/categories');
const items = require('./app/items');
const locations = require('./app/locations');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Подключение к базе
const connection = mysql.createConnection({
   host: 'localhost',
   user: 'mysql',
   password: 'mysql',
   database: 'hw79'
});

const port = 8000;

app.use('/categories', categories(connection));
app.use('/items', items(connection));
app.use('/locations', locations(connection));

connection.connect((err) => {
   if (err) {
       console.error('Error connecting: ' + err.stack);
       return;
   }

   console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});





