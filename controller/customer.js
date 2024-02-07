const Product = require('../models/product');


exports.home = (req, res, next) => {
    let listProd = [];
    res.render('index', { path: '/', prods: listProd });
}

exports.getAllProduct = (req, res, next) => {
    let listProd = [];
    Product.getAllProduct().then(data => {
        listProd = data;
        res.cookie('products', data);
        res.send(data);
    });
}

exports.productFiler = (req, res, next) => {
    let category = req.params.category;
    console.log('here is href');
    Product.getAllProductByCategory(category).then(data => {
        res.render('index', { path: '/filterCategory/' + category, prods: data });
    });
}

exports.getAllProductByTitle = (req, res, next) => {
    let name = req.params.name;
    console.log(name);
    Product.getAllProductByTitle(name).then(data => {
        res.send(data);
    });
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}