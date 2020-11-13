'use strict'

const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

// all routes start with '/categories'
router.get('/',categoriesController.getCategories)
router.get('/:category_id',categoriesController.getCategoryById)
router.get('/inProduct/:product_id',categoriesController.getCategoriesOfProduct)
router.get('/inDepartment/:department_id',categoriesController.getCategoriesOfDepartment)


module.exports = router