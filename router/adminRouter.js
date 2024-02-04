const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');

router.use('/login',adminController.login);
router.get('/home', adminController.adminHome);

module.exports = router;