'use strict'

const router = require('express').Router()
const attributeController = require('../controllers/attributeController')

// all routes start with '/attributes'
router.get('/',attributeController.getAttributes)
router.get('/:attribute_id',attributeController.getAttributeById)
router.get('/values/:attribute_id',attributeController.getAttributeValueByAttribute)
router.get('/inProduct/:product_id',attributeController.getAttributesByProductId)

module.exports = router