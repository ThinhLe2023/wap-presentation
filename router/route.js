const express = require('express');
const router = express.Router();
const customer = require('../controller/customer');

router.use('/filter/:category', customer.productFiler);
router.use('/',customer.home);
module.exports = router;