'use strict'

const knex = require('../util/database');
const error = require('../util/errorHandler');


// get list of all categories
exports.getCategories = (req,res) => {
    knex('category')
        .then(categories => {
            res.status(200).json({
                count: categories.length,
                rows: categories
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// get category by id
exports.getCategoryById = (req,res) => {
    knex('category')
        .where('category_id',req.params.category_id)
        .then(category => {
            if (category.length != 0){
                return res.status(200).send(category[0])
            }
            return res.status(400).send({
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// get categories by product id
exports.getCategoriesOfProduct = (req,res) => {
    const productId = req.params.product_id
    knex('category').select('category.category_id','category.department_id','category.name')
        .join('product_category',function() {
            this.on('category.category_id','=','product_category.category_id')
        })
        .where('product_id',productId)
        .then(categories => {
            if (categories.length != 0){
                return res.status(200).send(categories)
            }
            return res.status(400).send({
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// get categories by department id
exports.getCategoriesOfDepartment = (req,res) => {
    const departmentId = req.params.department_id
    knex('category')
        .where('department_id',departmentId)
        .then(categories => {
            if (categories.length != 0){
                return res.status(200).send(categories)
            }
            return  res.status(400).send({
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })

}