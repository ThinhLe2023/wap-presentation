let imgarr = ["/images/i15.jpeg", "/images/img3.jpeg", "/images/img4.jpeg", "/images/img5.jpeg"]
const listProduct = require("../models/product.js")
function getProduct (req, res, next) {
    let id  = 1;
    if(req.body.id)
        id = parseInt(req.body.id);
    let model = {id:1, imgarr: imgarr};
    let i;
    
    for (i = 0; i < listProduct.length; i++) {
        
        if(listProduct[i]._id == id) {
            model = listProduct[i];
            model.mainimg = listProduct[i].imageUrl;
        }
    }
    model.imgarr = imgarr;
    //console.log("model=", model);
    let cart = [];
    if(!req.cookies.cart) {
        res.cookie('cart', []);
    } else {
        cart = req.cookies.cart;
    }
    //console.log("cart", cart);
    model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
    let subtotal = cart.reduce((accum, ele) => accum + ele.price*ele.quantity, 0);
    model.subtotal = subtotal;
    console.log("model", model);
    res.render("detail", model);
}

function addToCart (req, res, next) {
    console.log("ajax", req.query);
    let cart = getCartFromCookie(req);
    let id = parseInt(req.query.id);

    let i = findIndexOfProductId(cart, id);
    if(i != -1) {
        cart[i].quantity++;
    } else {
        let price = listProduct.find(ele=>ele._id=id).price;
        cart.push({id:id, quantity:1, price:price});
    }

    console.log("Sau khi add vo cart", cart);
    res.cookie('cart', cart);
    res.cookie('test', 55);
    let model = {};
    model.subtotal = cart.reduce((accum, ele) => accum + ele.price*ele.quantity, 0);
    model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
    res.json(model);
}


function removeItem(req, res, next) {
    console.log("ajax", req.query);
    let cart = [];
    let id = parseInt(req.query.id);
    if(req.cookies.cart) {
        cart = req.cookies.cart;  
        console.log(req.cookies.cart);
        let i = 0;
        for (i = 0; i < cart.length; i++) {
            if(cart[i].id == id) {
                break;
            }
        }
        if(i != cart.length) {
            cart.splice(i, 1);
            res.cookie('cart', cart);
            let model = {};
            model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
            model.subtotal = cart.reduce((accum, ele) => accum + ele.price*ele.quantity, 0);
            res.json(model);
        }
    }     
}

function changeQuantity(req, res, next) {
    let cart = [];
    let id = parseInt(req.query.id);
    if(req.cookies.cart) {
        cart = req.cookies.cart;
        let idx = findIndexOfProductId(cart, id);
        if (idx > -1) {
            let item = cart[i];
            let model = {};
            item.quantity = item.quantity + parseInt(req.query.num);
            if(item.quantity > 0) {
                model.action = "change";
            } else {
                model.action = "remove";
                cart.splice(idx, 1);
            
            }
            model.newquantity = item.quantity;
            model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
            model.subtotal = cart.reduce((accum, ele) => accum + ele.price*ele.quantity, 0);;
            res.cookie('cart', cart);
            res.json(model);
        }
    }
}

function getCartFromCookie(req) {
    let cart = [];
    if(req.cookies.cart) {
        cart = req.cookies.cart;
    } else {
        res.cookie('cart', cart);
    }
    return cart;
}

function findIndexOfProductId(cart, id) {
    for (i = 0; i < cart.length; i++) {
        if(cart[i].id == id) {
            break;
        }
    }
    if(i != cart.length) 
        return i;
    return -1;
    
}

function getCart(req, res, next) {
    let cart = [];
    if(req.cookies.cart) {
        cart = req.cookies.cart;
    }
    let model = {};
    cart.map(ele=>ele.title = (listProduct.find(p=>p._id=ele.id).title));
    console.log("getcart", cart);
    model.cart = cart;
    model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
    model.subtotal = cart.reduce((accum, ele) => accum + ele.price*ele.quantity, 0);;
    res.render("cart", model);
}

module.exports = {getProduct, addToCart, removeItem, getCart, changeQuantity}