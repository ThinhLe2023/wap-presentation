const Product = require('../models/product');

exports.home = (req, res, next) => {

    console.log(Product.getAllProduct() );
    res.render('index', { path: '/', prods : Product.getAllProduct() });
}

exports.productFiler = (req, res, next) => {
    let category = req.params.category;
    let newProds = Product.getAllProductByCategory(category);
    console.log(listProduct, newProds, category);
    res.send(newProds);
}

exports.adminHome = (req, res, next) => {
    res.render('admin_home');
}