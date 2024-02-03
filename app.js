const http = require('http');

const express = require('express');

const fs = require('fs');

const app = express();

var ejs = require("ejs");
var cookieParser = require('cookie-parser');



app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const mongoConnect = require('./util/database').mongoConnect;
const Products = require('./models/product');

mongoConnect(() => {
    console.log('connected  =====');
    app.listen(80, () => {
        console.log('Your Server is running on 80');
    })
});

 console.log(Products.getAllProductByTitle('1'));
// try to save product 