'use strict'

const router = require('express').Router();
const shoppingCartController = require('../controllers/shoppingCartController');
const verifyToken = require('../middleware/verifyToken');

// all route start with => localhost:3000/shoppingcart
router.get('/generateUniqueId',verifyToken,shoppingCartController.getGenerateCartId);
router.post('/add',verifyToken,shoppingCartController.postProductInCart);
router.get('/:cart_id',verifyToken,shoppingCartController.getProductsByCartId);
router.put('/update/:item_id',verifyToken,shoppingCartController.putCartByItemId);
router.delete('/empty/:cart_id',verifyToken,shoppingCartController.deleteCart);
router.get('/totalAmount/:cart_id',verifyToken,shoppingCartController.getTotalAmoutByCartId);
router.get('/saveForLater/:item_id',verifyToken,shoppingCartController.getProductsForlatter);
router.get('/getSaved/:cart_id',verifyToken,shoppingCartController.getProductForLatterByCartId);
router.get('/moveToCart/:item_id',verifyToken,shoppingCartController.getProductToCart);
router.delete('/removeProduct/:item_id',verifyToken,shoppingCartController.deleteProductByItemId)

module.exports = router;