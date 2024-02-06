const listProduct = require('../models/product');

exports.home = (req, res, next) => {
    console.log('here i am');
    res.render('index', { path: '/', prods: listProduct });
}

exports.productFiler = (req, res, next) => {
    let category = req.params.category;
    let newProds = listProduct.filter((item) => item.category == category);
    console.log(newProds);
    res.send(newProds);
    res.re
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}