const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.use('/login',adminController.login);
router.get('/home', adminController.adminHome);
router.get('/product-update/:id', adminController.adminGetProductId)
router.get('/product-delete/:id', adminController.adminProductDelete)
router.get('/product', adminController.adminGetProduct)
router.post('/product', adminController.adminPostProduct);

module.exports = router;