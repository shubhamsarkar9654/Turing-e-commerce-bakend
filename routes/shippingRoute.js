'use strict'

const router = require('express').Router()
const shippingController = require('../controllers/shippingController')

router.get('/',shippingController.getShippingRegions)
router.get('/:shipping_region_id',shippingController.getShippingRegionsById)

module.exports = router