let imgarr = ["/images/i15.jpeg", "/images/img3.jpeg", "/images/img4.jpeg", "/images/img5.jpeg"]
const db = require("../models/product.js")
var ejs = require("ejs");
let path = require('path');
function getProduct (req, res, next) {
    //console.log(req.query);
    let id  = '65c258c3cf39e0972174b9c0';
    if(req.body.id)
        id = req.body.id;
    else if(req.query.id)
        id = req.query.id;
    let model = {id:1, imgarr: imgarr};
    console.log("getProduct",id);
    /*
   db.getAllProduct().then(res=>{
    console.log("getAllProduct================", res);
   })
   */
    db.getProductById(id).then(result => {
        //console.log("getProductById res_________", result);
        if(result) {
            //console.log("getProductById result_________", result);
            model = result;
            model.mainimg = "/" + result.imageUrl[0]; //result.imageUrl;
            model.imgarr = imgarr;
            let cart = getCartFromCookie(req, res);
            model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
            let subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);
            model.subtotal = subtotal;
            model.cart = cart;
            //console.log("model", model);
            res.render("detail", model);
        } else {
            res.send("No data");
        }
    });
    /*
    console.log("getProductById", model);
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
    */
}

function addToCart (req, res, next) {
    console.log("ajax", req.query);
    let cart = getCartFromCookie(req, res);
    let id = req.query.id;

    let i = findIndexOfProductId(cart, id);
    if(i != -1) {
        cart[i].quantity++;
        res.cookie('cart', cart);
        let model = {};
        //console.log("addToCart cart", cart);
        model.subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);
        model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
        model.cart = cart;
        //res.json(model);
        renderCartHtml(res, model);
    } else {
        db.getProductById(id).then(
            //console.log("getProductById res_________", result);
            function(val) { 
                cart.push({id:id, quantity:1, price:parseFloat(val.price), title: val.title});
                //console.log("Sau khi add vo cart", cart);
                res.cookie('cart', cart);
                console.log("addToCart cart getPrice", cart);
                let model = {};
                model.subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);
                model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
                model.cart = cart;

                renderCartHtml(res, model);
                              
            },
            function(error) { /* code if some error */ }
        );       
    }    
}

function renderCartHtml(res, model) {
    const renderHtmlFile = async () => {
        try {
            let html = await ejs.renderFile(path.join(__dirname, '../views/cartlist.html'), model);
            //console.log(html);
            return html;
        } catch (error) {
            console.log("Error occured: ", error);
        }
    }
    let html = renderHtmlFile().then(
        function(html) {
            //console.log(html);
            model.carthtml = html;
            res.json(model);
        }
    );
}

function removeItem(req, res, next) {
    //console.log("ajax", req.query);
    let cart = [];
    let id = parseInt(req.query.id);
    if(req.cookies.cart) {
        cart = req.cookies.cart;  
        //console.log(req.cookies.cart);
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
            model.subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);
            res.json(model);
        }
    }     
}

function changeQuantity(req, res, next) {
    let cart = [];
    let id = req.query.id;
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
            model.subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);;
            res.cookie('cart', cart);
            res.json(model);
        }
    }
}

function getCartFromCookie(req, res) {
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
    //cart.map(ele=>ele.title = (listProduct.find(p=>p._id=ele.id).title));
    //console.log("getcart", cart);
    model.path = '/addcart';
    model.cart = cart;
    model.noofitem = cart.reduce((accum, ele) => accum + ele.quantity, 0);
    model.subtotal = cart.reduce((accum, ele) => accum + parseFloat(ele.price)*ele.quantity, 0);;
    res.render("cart", model);
}

module.exports = {getProduct, addToCart, removeItem, getCart, changeQuantity}