const express = require('express');
const router = express.Router();
const customer = require('../controller/customer');

router.get('/category/:category', customer.productFiler);
router.get('/', customer.home);
router.get('/allProducts', customer.getAllProduct);
router.get('/getProductByName/:name', customer.getAllProductByTitle);

module.exports = router;