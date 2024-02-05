const listProduct = require('../models/product');

exports.home = (req, res, next) => {
    console.log(listProduct);
    res.render('index', {path:'/', prods: listProduct});
}

exports.productFiler = (req, res, next) => {
    
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}