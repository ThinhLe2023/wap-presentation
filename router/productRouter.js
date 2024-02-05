const express = require('express');
const router = express.Router();
const productController = require('../controller/product');


router.get("/detail", productController.getProduct);
router.get("/addcart", productController.addToCart);
router.get("/removeitem", productController.removeItem);
router.get("/cart", productController.getCart);

module.exports = router;