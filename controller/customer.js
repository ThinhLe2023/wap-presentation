const Product = require('../models/product');


exports.home = (req, res, next) => {
    let listProd = [];
    let cartlength = req.cookies.cart?req.cookies.cart.length:0;
    res.render('index', { path: '/', prods: listProd, 
                            noofitem: req.cookies.cart?req.cookies.cart.reduce((ac, e)=>ac+e.quantity,0):0 });
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
    console.log(category);
    Product.getAllProductByCategory(category).then(data => {
        res.render('index', {path: '/category/' + category, prods: data,
            noofitem: req.cookies.cart?req.cookies.cart.reduce((ac, e)=>ac+e.quantity,0):0 });
    });
}

exports.getAllProductByTitle = (req, res, next) => {
    let name = req.params.name;
    Product.getAllProductByTitle(name).then(data => {
        res.send(data);
    });
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}