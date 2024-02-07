const userList = require('../util/constant').adminLogin;
const categoryList = require('../util/constant').category;
const Product = require('../models/product')
const Order = require('../models/order');
exports.login = (req, res, next) => {
    console.log(userList);
    if (req.method == 'POST') {
        let username = req.body.username;
        let password = req.body.password;
        let remember = req.body.remember;
        if(username && password) {
            let user = userList.filter((e) => e.username == username && e.password == password)
            if (user.length > 0) {
                if(remember) {
                    console.log('set cookies   =====', user[0] );
                    // set cookies
                    res.cookie('logined', user[0].cookies, {maxAge: 1000 * 60 * 60 ,signed: true});
                }
                // set session
                req.session.userName = user[0].username;
                res.redirect('/admin/home');
            } else {
                res.render('admin/login', {error: 'Username or password is incorrect!'})
            }
        } else {
            res.render('admin/login', {error: 'Require user name and password'});
        }
    } else {
        if(req.session.userName) {
            res.redirect('/admin/home');
            return;
        }
        let cookies = req.signedCookies.logined;
        if(cookies) {
            let user = userList.filter((e) => e.cookies == cookies);
            if (user.length > 0) {
                req.session.userName = user[0].username;
                res.redirect('/admin/home');
                return;
            }
        }
        res.render('admin/login', {error: ''});
    }
}

exports.auth = (req, res, next) => {
    if(req.session.userName) {
        next();
        return;
    }
    // check cookies
    let cookies = req.signedCookies.logined;
    console.log('signed cookies vlaue   =====', cookies );
    if(cookies) {
        let user = userList.filter((e) => e.cookies == cookies);
        if (user.length > 0) {
            req.session.userName = user[0].username;
            next();
            return;
        }
    }
    res.redirect('/admin/login');
}
exports.adminGetProduct = (req, res, next) => {
    res.render('admin/product_create', {category: categoryList, name: req.session.userName, path: req.path});
}
exports.adminGetProductId = (req, res, next) => {

    let id = req.params.id;
    console.log('load product');
    Product.getProductById(id).then(product => {
        if(product) {
            res.render('admin/product_update', {category: categoryList, product: product, error:'', name: req.session.userName , path: req.path});
        } else {
            res.render('admin/product_create', {category: categoryList, error: 'Cannot find product', name: req.session.userName, path: req.path});
        }
    }).catch(e => {
        console.log('error load product id ' +  id);
        res.render('admin/product_create', {category: categoryList, error: 'Cannot find product', name: req.session.userName, path: req.path});
    })
}

exports.adminProductDelete = (req, res, next) => {
    let id = req.params.id;
    console.log('load product');
    Product.deleteById(id)
    .then(result => {
        console.log('delete product  ', result);
        res.redirect('/admin/home');
    }).catch(e => {
        console.log('error load product id ' +  id);
    })
}

exports.adminPostProduct = (req, res, next) => {
    
    let id = req.body.product_id;
    let title = req.body.title
    let price = req.body.price
    let discount = req.body.discount;
    let description = req.body.description;
    let category = req.body.category;
    let images = [];
    if(req.body.files){
        images.push(req.body.files);
    }

    if(req.files){
        images = req.files.map((e) => e.path);        
    }
    let product = new Product(title, price, discount, description, category, images);
    if(req.body.walmart_id){
        product.walmart_id = req.body.walmart_id;
    }
    if (id) {
        console.log('update========',   id);
        product = new Product(title, price, discount, description, category, images, id);
    }

    product.save().then( result => {
        console.log('add product ======= ',result);
        res.redirect('/admin/home');
    }).catch( e => {
        console.log('add product error ==== ', e);
    });
}

exports.adminHome = (req, res, next) => {
    Product.getAllProduct().then( result => {
        res.render('admin/admin_home', {list: result, name: req.session.userName, path: req.path});
    }).catch(e => {
        console.log(e);
    });
}

exports.getAllOrder = (req, res, next) => {
    Order.getAllOrders().then(orders => {
        res.render('admin/admin_order', {orders: orders, name: req.session.userName, path: req.path});
    }).catch( e => {
        console.log(e);
    });
}

exports.removeOrder = (req, res, next) => {
    let id = req.params.id;
    Order.deleteById(id).then(result => {
        console.log('delete order : ', result);
        res.redirect('/admin/orders');
    }).catch( e => {
        console.log(e);
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy();
    res.clearCookie('logined');
    res.redirect('/admin/login');
}