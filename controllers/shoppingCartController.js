'use strict'

const knex = require('../util/database');
const uniqid = require('uniqid');
const error = require('../util/errorHandler');
const { table } = require('../util/database');

// generate unique cart_id 
exports.getGenerateCartId = (req,res) => {
    const cartId = uniqid()
    knex('shopping_cart')
        .where('cart_id',cartId)
        .select('cart_id')
        .then(cartIdData => {
            if (cartIdData.length == 0) {
                return res.json({
                    cart_id: cartId
                })
            }
            res.json({
                message: 'Already exit same cart_id'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        });
};

// add product to cart
exports.postProductInCart = (req,res) => {
    const {cart_id,product_id,attributes} = req.body
    if (req.body.hasOwnProperty('cart_id') && req.body.hasOwnProperty('product_id') && req.body.hasOwnProperty('attributes')) {
        // display cart to user
        const displayUserCart = () => {
            knex('shopping_cart')
                .join('product','shopping_cart.product_id','product.product_id')
                .where('shopping_cart.cart_id',cart_id)
                .andWhere('product.product_id',product_id)
                .select('name','attributes','product.product_id','price','quantity','image')
                .then(shoppingData => {
                    return res.send(shoppingData)
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(error.error500)
                })
        }
        // add product to cart
        return knex('shopping_cart')
            .join('product','shopping_cart.product_id','product.product_id')
            .where('cart_id',cart_id)
            .andWhere('product.product_id',product_id)
            .then(cartData => {
                
                if (cartData.length == 0) {
                    return knex('shopping_cart')
                        .join('product','shopping_cart.product_id','product.product_id')
                        .where('cart_id',cart_id)
                        .andWhere('product.product_id',product_id)
                        .insert({
                            cart_id: cart_id,
                            product_id: product_id,
                            attributes: attributes,
                            quantity: 1,
                            added_on: new Date()
                        })
                        .then(() => {
                            return displayUserCart()
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json(error.error500)
                        })
                }
                knex('shopping_cart')
                    .join('product','shopping_cart.product_id','product.product_id')
                    .where('cart_id',cart_id)
                    .andWhere('product.product_id',product_id)
                    .update({
                        quantity: cartData[0].quantity + 1,
                        added_on: new Date()
                    })
                    .then(() => {
                        return displayUserCart()
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(error.error500)
                    })
            })
    }
    res.status(400).send(error.errorInvalidInput)
}

// get list of products by cart_id
exports.getProductsByCartId = (req,res) => {
    const cartId = req.params.cart_id
    if (req.params.hasOwnProperty('cart_id')) {
        return knex('shopping_cart')
            .join('product','product.product_id','shopping_cart.product_id')
            .where('shopping_cart.cart_id',cartId)
            .select('item_id','name','attributes','product.product_id','price','quantity','image')
            .then(productsData => {
                return res.send(productsData)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(error.error500)
            })
    }
    res.status(400).send(error.errorInvalidInput)  
}

// update cart by item
exports.putCartByItemId = (req,res) => {
    const itemId = req.params.item_id
    const {quantity} = req.body
    if (req.params.hasOwnProperty('item_id') && req.body.hasOwnProperty('quantity')) {
        return knex('shopping_cart')
            .where('item_id',itemId)
            .update({
                quantity: quantity
            })
            .then(() => {
                knex('shopping_cart')
                    .join('product','product.product_id','shopping_cart.product_id')
                    .where('item_id',itemId)
                    .then(shoppingData => {
                        return res.send(shoppingData)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(error.error500)
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(error.error500)
            })
    }
    res.status(400).send(error.errorInvalidInput)
}

// empty cart by cart_id
exports.deleteCart = (req,res) => {
    const cartId = req.params.cart_id
    if (req.params.hasOwnProperty('cart_id')) {
        return knex('shopping_cart')
            .where('shopping_cart.cart_id',cartId)
            .del()
            .then(data => {
                res.send('cart clear successfully...')
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(error.error500)
            })
    }
    res.status(400).send(error.errorInvalidInput)
}

// get totalAmount from Cart
exports.getTotalAmoutByCartId = (req,res) => {
    const cartId = req.params.cart_id
    knex('shopping_cart')
        .join('product','product.product_id','shopping_cart.product_id')
        .where('cart_id',cartId)
        .then(cartData => {
            // using bitwise operator('~~') for whole number...
            const totalAmount = ~~cartData.map(p => p.quantity*p.price).reduce((total,element) => total+element,0)
            return res.json({
                totalAmount: totalAmount
            })  
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// save products for latter
// exports.getProductsForlatter = (req,res) => {
//     const {item_id} = req.params
//     knex.schema.hasTable('save_latter_cart')
//         const dumpProductForLatter = () => {
//             k
//         }
//         .then(exists => {
//             if (!exists){
//                 return  knex.schema.createTable('save_latter_cart',table => {
//                     table.integer('item_id').primary()
//                     table.string('cart_id')
//                     table.integer('product_id')
//                     table.string('attributes')
//                     table.string('quantity')   
//                 })
//                 .then(() => {

//                 })
                    
//             }

//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json(error.error500)
//         })
// }