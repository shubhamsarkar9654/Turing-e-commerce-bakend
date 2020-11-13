'use strict'

const router = require('express').Router();
const taxController = require('../controllers/taxController');

router.get('/',taxController.getAllTaxes)
router.get('/:tax_id',taxController.getTaxById)

module.exports = router