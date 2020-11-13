'use strict'

const router = require('express').Router()
const productController = require('../controllers/productController')

// all routes start with products
router.get('/',productController.getProducts)
router.get('/search',productController.getSearchProduct)
router.get('/:product_id',productController.getProductById)
router.get('/inCategory/:category_id',productController.getProductsByCategoryId)
router.get('/inDepartment/:department_id',productController.getProductsByDepartmentId)
router.get('/:product_id/deatils',productController.getProductDetailsByProductId)
router.get('/:product_id/locations',productController.getProductLocationByProductId)
router.get('/:product_id/reviews',productController.getProductReviewByProductId)

module.exports = router