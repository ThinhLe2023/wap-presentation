const express = require('express');
const router = express.Router();
const customer = require('../controller/customer');

router.get('/filter/:category', customer.productFiler);
router.get('/', customer.home);

module.exports = router;