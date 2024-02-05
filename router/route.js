const express = require('express');
const router = express.Router();
const customer = require('../controller/customer');

router.use('/',customer.home);
router.use('/filter/:filter', customer.productFiler);

module.exports = router;