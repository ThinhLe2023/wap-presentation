const http = require('http');
const path = require('path');
const express = require('express');
const adminRouter = require('./router/adminRouter')
const customerRouter = require('./router/route');
const productRouter = require('./router/productRouter.js');

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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const mongoConnect = require('./util/database').mongoConnect;
const Products = require('./models/product');


app.listen(80, () => {
    console.log('Your Server is running on 80');
})

app.use('/', customerRouter);
app.use('/admin',adminRouter);
app.use('/product', productRouter);

/*
app.get('/*',(req, res, next) => {
    res.render('404');
});
*/

// mongoConnect(() => {
//     console.log('connected  =====');
//     app.listen(80, () => {
//         console.log('Your Server is running on 80');
//     })
// });

 //console.log(Products.getAllProductByTitle('1'));
// try to save product 