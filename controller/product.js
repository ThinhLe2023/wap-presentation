let imgarr = ["/images/i15.jpeg", "/images/img3.jpeg", "/images/img4.jpeg", "/images/img5.jpeg"]
function getProduct (req, res, next) {
    let model = {id:1, imgarr: imgarr};
    model.mainimg = imgarr[0];
    model.desc = "AT&T Apple iPhone 15 Pro Max 256GB Natural Titanium";
    model.price = 1000;
    if(!req.cookies.cart)
    res.cookie('cart', []);
    res.cookie('test', 55);
    res.render("detail", model);
}

function addToCart (req, res, next) {
    console.log("ajax", req.query);
    let cart = [];
    if(req.cookies.cart) {
        cart = req.cookies.cart;  
        console.log(req.cookies.cart);
        console.log("Co san", cart);
    } 
    cart.push(req.query.id);
    console.log("Sau khi add vo cart", cart);
    res.cookie('cart', cart);
    res.cookie('test', 55);
    res.json(cart);
}


function removeItem(req, res, next) {
    console.log("ajax", req.query);
    let cart = [];
    let id = req.query.id;
    if(req.cookies.cart) {
        cart = req.cookies.cart;  
        console.log(req.cookies.cart);
        if(cart.indexOf(id) > -1) {
            cart.splice(cart.indexOf(id, 1));
            res.cookie('cart', cart);
            res.json({noofitem: cart.length, subtotal: 500});
        }
    }     
}

function getCart(req, res, next) {
    let cart = [];
    if(req.cookies.cart) {
        cart = req.cookies.cart;
    }
    res.render("cart", {noofitem: cart.length, subtotal: 1500});
}

module.exports = {getProduct, addToCart, removeItem, getCart}