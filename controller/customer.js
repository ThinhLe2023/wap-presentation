const listProduct = require('../models/product');

exports.home = (req, res, next) => {
    res.render('index', { path: '/', prods: listProduct });
}

exports.productFiler = (req, res, next) => {
    let category = req.params.category;
    let newProds = listProduct.filter((item) => item.category == category);
    //console.log(listProduct, newProds, category);
    res.render('index', { path: '/filter/' + category, prods: newProds });
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}