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
    Product.getAllProduct().then(data => {
        res.render('index', { path: '/filterCategory/' + category, prods: data });
    });
}

exports.productTitleFiler = (req, res, next) => {
    let title = req.params.title;
    let newProds = Product.getAllProductByTitle(title).then(data => {
        res.send(newProds);
    });
}


exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}