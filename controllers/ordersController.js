'use strict'

const knex = require('../util/database')
const error = require('../util/errorHandler');


// create orders
exports.postOrders = (req,res) => {
    const {cart_id,shipping_id,tax_id} = req.body
    if (req.body.hasOwnProperty('cart_id') && req.body.hasOwnProperty('shipping_id') && req.body.hasOwnProperty('tax_id')) {
        return knex('customer')
            .where('email',req.email)
            .then(customerData => {
                knex('shopping_cart')
                    .join('product',function(){
                        this.on('shopping_cart.product_id','product.product_id')
                    })
                    .where('shopping_cart.cart_id',cart_id)
                    .then(shoppingData => {
                        const total_amount = shoppingData.map(p => p.price * p.quantity)
                        .reduce((total,eachItem) => total+eachItem,0)
                        knex('orders')
                            .insert({
                                total_amount: total_amount,
                                created_on: new Date(),
                                customer_id: customerData[0].customer_id,
                                shipping_id: shipping_id,
                                tax_id: tax_id 
                            })
                            .then(() => {
                               console.log(shoppingData)
                               knex('shopping_cart')
                                .where('shopping_cart.cart_id',cart_id)
                                .del()
                                .then(() => {
                                    knex('orders')
                                        .then(ordersData => {
                                            shoppingData.map(eachItem => {
                                                return knex('order_detail')                                                
                                                    .insert({
                                                        'order_id': ordersData[ordersData.length - 1].order_id,
                                                        'product_id': eachItem.product_id,
                                                        'attributes': eachItem.attributes,
                                                        'product_name': eachItem.name,
                                                        'quantity': eachItem.quantity,
                                                        'unit_cost': eachItem.price
                                                    })
                                                    .then(() => {
                                                        console.log()
                                                    })
                                                    .catch(err => {
                                                        console.log(err)
                                                    })
                                            })
                                            return res.json({
                                                orderId: ordersData[ordersData.length - 1].order_id
                                            })
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    } 
    res.status(400).send('invalid input!')
}

// get list of orders of customer
exports.getOrdersOfCustomer = (req,res) => {
    knex('orders')
        .join('customer','customer.customer_id','orders.customer_id')
        .where('customer.email',req.email)
        .then(ordersData => {
            if (ordersData.length != 0) {
                return res.send(ordersData)
            }
            res.status(400).send({
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

// get order_detail info by order_id
exports.getOrdersInfoById = (req,res) => {
    const orderId = req.params.order_id
    if (req.params.hasOwnProperty('order_id')) {
        return knex('order_detail')
            .where('order_id',orderId)
            .then(orderDetail => {
                if (orderDetail.length != 0) {
                    return res.send(orderDetail)
                }
                res.status(400).send({
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
    res.status(400).send('invalid path!')
}

// get orders info by order_id
exports.getShortOrderInfoById = (req,res) => {
    const orderId = req.params.order_id
    if (req.params.hasOwnProperty('order_id')) {
        return knex('orders')
            .join('order_detail','order_detail.order_id','orders.order_id')
            .where('orders.order_id',orderId)
            .select('orders.order_id','total_amount','created_on','shipped_on','status','product_name as name')
            .then(ordersData => {
                if (ordersData.length != 0) {
                    return res.send(ordersData[0])
                }
                res.status(400).send({
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
    res.status(400).send('invalid path!')
}