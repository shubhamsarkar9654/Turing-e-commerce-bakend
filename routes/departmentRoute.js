'use strict'

const router = require('express').Router()
const departmentController = require('../controllers/departmentController')

//  all routes start with '/departments'
router.get('/',departmentController.getDepartments)
router.get('/:department_id',departmentController.getDepartment)

module.exports = router