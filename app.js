const express = require('express');
const adminRouter = require('./router/adminRouter')
const path = require('path');
const multer = require('multer');
const app = express();

var ejs = require("ejs");
var cookieParser = require('cookie-parser');

// file storage
const fileStorege = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-'+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


//EJS Engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/images',express.static(path.join(__dirname, 'images')));

app.use(cookieParser("usercookies"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer({storage: fileStorege, fileFilter: fileFilter}).array('product_images')); //single('product_images'));//
//app.use(multer().array('product_images'));


const mongoConnect = require('./util/database').mongoConnect;
const Products = require('./models/product');
const Order = require('./models/order');

mongoConnect(() => {
    console.log('connected  =====');
    app.listen(80, () => {
        console.log('Your Server is running on 80');
    });

    // let order = new Order('conntant viennv', [{_id : '65c173e38cfa37f5178c670e', amount: 2}, {_id : '65c17b9d70e14aa86dc3360b', amount: 2}])
    // order.save().then(result => {
    //     console.log('save order   ', result);
    // }).catch(e => {
    //     console.log('save order error ', e);
    // });
    // Order.getAllOrders()
    // .then(orders => console.log(' result orders',orders))
    // .catch(e => console.log(e));
});


// app.listen(80, () => {
//     console.log('Your Server is running on 80');
// })

app.use('/admin',adminRouter);


app.get('/*',(req, res, next) => {
    res.render('404');
});

 //console.log(Products.getAllProductByTitle('1'));
// try to save product 