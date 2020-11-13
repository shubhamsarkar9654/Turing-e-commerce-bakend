'use strict'

const router = require('express').Router();
const customerController = require('../controllers/customerController');
const verifyToken = require('../middleware/verifyToken');

router.post('/customers',customerController.postCustomer);
router.post('/customers/login',customerController.postCustomerLogin);
router.post('/customers/facebook',customerController.postCustomerByFacebook);
router.get('/customer',verifyToken,customerController.getCustomerById);
router.put('/customer',verifyToken,customerController.putCustomer);
router.put('/customers/address',verifyToken,customerController.putCustomerAddress);
router.put('/customers/creditCard',verifyToken,customerController.putCustomerCreditCard);

module.exports = router;
