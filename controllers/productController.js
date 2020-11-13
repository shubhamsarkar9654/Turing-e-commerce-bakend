'use strict'

const knex = require('../util/database')
const error = require('../util/errorHandler');


// get all products
exports.getProducts = (req,res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    // const description = req.query.description
    const offset = page == 1 ? 0 : page*limit - limit
    console.log(page,limit,offset)
    knex('product')
        .select('product_id','name','description','price','discounted_price','thumbnail').limit(limit).offset(offset)
        .then(products => {
            if (products.length != 0) {
                return res.json({
                    count:products.length,
                    rows: products
                })
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

//get seach products
exports.getSearchProduct = (req,res) => {
    const searchWord = req.query.string
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    // const description = req.query.description
    const offset = page == 1 ? 0 : page*limit - limit
    knex('product')
        .select('product_id','name','description','price','discounted_price','thumbnail').limit(limit).offset(offset)
        .where('name','like',`%${searchWord}%`)
        .then(product => {
            if (product.length != 0){
                return res.json({
                    count:product.length,
                    rows: product
                })
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

// get products by product_id
exports.getProductById = (req,res) => {
    const ProductId = req.params.product_id
    knex('product')
        .where('product_id',ProductId)
        .then(product => {
            if (product.length != 0){
                return res.send(product)
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
        })
}

// get products by category_id
exports.getProductsByCategoryId = (req,res) => {
    const categoryId = req.params.category_id
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    // const description = req.query.description
    const offset = page == 1 ? 0 : page*limit - limit
    knex('product')
        .join('product_category',function() {
            this.on('product.product_id','product_category.product_id')
        })
        .where('category_id',categoryId)
        .select('product.product_id','name','description','price','discounted_price','thumbnail').limit(limit).offset(offset)
        .then(products => {
            if (products.length != 0){
                return res.json({
                    count:products.length,
                    rows: products
                })
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

// get products by department_id
exports.getProductsByDepartmentId = (req,res) => {
    const deapartmentId = req.params.department_id
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    // const description = req.query.description
    const offset = page == 1 ? 0 : page*limit - limit
    knex('product')
        .join('product_category',function() {
            this.on('product.product_id','product_category.product_id')
        })
        .join('category',function() {
            this.on('product_category.category_id','category.category_id')
        })
        .where('category.department_id',deapartmentId)
        .select('product.product_id','product.name','product.description','price','discounted_price','thumbnail').limit(limit).offset(offset)
        .then(products => {
            console.log(products[0])
            if (products.length != 0){
                return res.json({
                    count:products.length,
                    rows: products
                })
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

// get productDetails by product_id
exports.getProductDetailsByProductId = (req,res) => {
    const ProductId = req.params.product_id
    knex('product')
        .where('product_id',ProductId)
        .select('product_id','name','description','price','discounted_price','image','image_2 as image2')
        .then(product => {
            if (product.length != 0){
                return res.send(product)
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

// get productLocation by product_id
exports.getProductLocationByProductId = (req,res) => {
    const productId = req.params.product_id
    knex('product')
        .join('product_category',function(){
            this.on('product_category.product_id','product.product_id')
        })
        .join('category',function(){
            this.on('category.category_id','product_category.category_id')
        })
        .join('department',function(){
            this.on('department.department_id','category.department_id')
        })
        .where('product.product_id',productId)
        .select('category.category_id','category.name as category_name','department.department_id','department.name as department_name')
        .then(productLocation => {
            if (productLocation.length != 0){
                return res.send(productLocation[0])
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

// get product_review by product_id
exports.getProductReviewByProductId = (req,res) => {
    const productId = req.params.product_id
    knex('product')
        .join('review',function(){
            this.on('review.product_id','product.product_id')
        })
        .where('product.product_id',productId)
        .select('name','review','rating','created_on')
        .then(productReview => {
            if (productReview.length != 0){
                return res.send(productReview)
            }
            return res.status(404).send({
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
















