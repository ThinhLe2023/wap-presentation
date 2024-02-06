const express = require('express');
const router = express.Router();
const customer = require('../controller/customer');

router.get('/category/:category', customer.productFiler);
router.get('/filterTitle/:title', customer.productTitleFiler);
router.get('/', customer.home);
router.get('/allProducts', customer.getAllProduct);

module.exports = router;