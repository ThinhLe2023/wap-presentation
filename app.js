// const http = require('http');

// const express = require('express');

// const fs = require('fs');

// const app = express();

// app.use((req, res, next) => {
//     console.log("In the middleware!");
//     next();
// });
// app.use((req, res, next) => {
//     console.log("In another middleware!");
// });

// const server = http.createServer(app);

// server.listen(3000);

const mongoConnect = require('./util/database').mongoConnect;
const Products = require('./models/product');

mongoConnect(() => {
    console.log('connected  =====');
});
// try to save product 
let product = new Products('title', '14.3', 'first product ', 'https://www.almanac.com/sites/default/files/styles/or/public/image_nodes/sunflower-1627193_1920.jpg?itok=td7mL8qA');
product.save();