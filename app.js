const http = require('http');

const express = require('express');
const adminRouter = require('./router/adminRouter')
const fs = require('fs');

const app = express();

var ejs = require("ejs");
var cookieParser = require('cookie-parser');



//EJS Engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(cookieParser("viennv"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const mongoConnect = require('./util/database').mongoConnect;
const Products = require('./models/product');


app.listen(80, () => {
    console.log('Your Server is running on 80');
})

app.use('/admin',adminRouter);


app.get('/*',(req, res, next) => {
    res.render('404');
});


// mongoConnect(() => {
//     console.log('connected  =====');
//     app.listen(80, () => {
//         console.log('Your Server is running on 80');
//     })
// });

 //console.log(Products.getAllProductByTitle('1'));
// try to save product 