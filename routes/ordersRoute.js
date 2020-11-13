'use strict'

const router = require('express').Router()
const ordersControoller = require('../controllers/ordersController')
const verifyToken = require('../middleware/verifyToken')

router.post('/',verifyToken,ordersControoller.postOrders)
router.get('/inCustomer',verifyToken,ordersControoller.getOrdersOfCustomer)
router.get('/:order_id',verifyToken,ordersControoller.getOrdersInfoById)
router.get('/shortDetail/:order_id',verifyToken,ordersControoller.getShortOrderInfoById)

module.exports = router