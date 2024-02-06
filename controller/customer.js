const Product = require('../models/product');

exports.home = (req, res, next) => {
    let listProd = [];
    Product.getAllProduct().then(data => {
        listProd = data;
        console.log(data);
        res.render('index', { path: '/', prods: listProd });
    });
}

exports.productFiler = (req, res, next) => {
    let category = req.params.category;
    let newProds = Product.getAllProductByCategory(category).then(data => {
        res.send(newProds);
    });
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}