const userList = require('../util/constant').adminLogin;
const categoryList = require('../util/constant').category;
const Product = require('../models/product')
const Order = require('../models/order');
exports.login = (req, res, next) => {
    console.log(userList);
    if (req.method == 'POST') {
        let username = req.body.username;
        let password = req.body.password;
        // check had set username and password
        
        if(username && password) {
            let user = userList.filter((e) => e.username == username && e.password == password)
            if (user.length > 0) {
                res.redirect('/admin/home');
            } else {
                res.render('login', {error: 'Username or password is incorrect!'})
            }
        } else {
            res.redirect('back');
        }
    } else {
        res.render('login', {error: ''});
    }
}



exports.adminGetProduct = (req, res, next) => {
    console.log('herer ========');
    res.render('admin/product_create', {category: categoryList});
}
exports.adminGetProductId = (req, res, next) => {
    let id = req.params.id;
    console.log('load product');
    Product.getProductById(id).then(product => {
        if(product) {
            res.render('admin/product_update', {category: categoryList, product: product, error:''});
        } else {
            res.render('admin/product_create', {category: categoryList, error: 'Cannot find product'});
        }
    }).catch(e => {
        console.log('error load product id ' +  id);
        res.render('admin/product_create', {category: categoryList, error: 'Cannot find product'});
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
    let images = req.files.map((e) => e.path);
    let product = new Product(title, price, discount, description, category, images);
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
        res.render('admin/admin_home', {list: result});
    }).catch(e => {
        console.log(e);
    });
}

exports.getAllOrder = (req, res, next) => {
    Order.getAllOrders().then(orders => {
        res.render('admin/admin_order', {orders: orders});
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