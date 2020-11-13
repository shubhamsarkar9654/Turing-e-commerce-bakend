'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const knex = require('../util/database');
const error = require('../util/errorHandler');


// register a customer
exports.postCustomer = (req,res) => {   
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    bcrypt.hash(password,10)
        .then(hashPassword => {
            knex('customer')
                .insert({
                    name: name,
                    email: email,
                    password: hashPassword
                })
                .then(() => {
                    knex('customer')
                        .where('email',req.body.email)
                        .then(data => {
                            delete data[0].password
                            jwt.sign({email: email},'qwerty',{expiresIn: '24h'},(err,token) => {
                                if (token){
                                    res.cookie('Bearer',token,{maxage: 1000*60*60*24})
                                    return res.json({
                                        customer: {
                                            schema: data[0]
                                        },
                                        acessToken: `Bearer ${token}`,
                                        expires: '24h'
                                    })
                                }
                                return console.log(err)
                            })
                        })
                    
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json(error.error500)
                })
        })
};

// login customer
exports.postCustomerLogin = (req,res) => {
    const email = req.body.email
    const password = req.body.password
    knex('customer')
        .where('email',req.body.email)
        .then(userData => {
            // checking email is exists
            if (userData.length == 0 ) {
                return res.send('Invalid email or password!')
            }
            bcrypt.compare(password,userData[0].password)
                .then(isPasswordMatch => {
                    if (!isPasswordMatch) {
                        return res.send('Invalid email or password!')
                    }
                    delete userData[0].password
                    jwt.sign({email: email},'qwerty',{expiresIn: '24h'},(err,token) => {
                        if (token){
                            res.cookie('Bearer',token,{maxage: 1000*60*60*24})
                            return res.json({
                                customer: {
                                    schema: userData[0]
                                },
                                acessToken: `Bearer ${token}`,
                                expires: '24h'
                            })
                        }
                        return console.log(err)
                    })
                    
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        });    
};


// login thorugh facebook
exports.postCustomerByFacebook = (req,res) => {
    res.send('this feature will come soon...')
}

// get customer by id
exports.getCustomerById = (req,res) => {
    knex('customer')
        .where(email,req.email)
        .then(customerData => {
            if (customerData.length != 0) {
                delete customerData[0].password
                return res.send(customerData)
            }
            res.status(400).json({
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

// update customer
exports.putCustomer = (req,res) => {
    if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('email')) {
        return bcrypt.hash(req.body.password,10)
            .then(hashPassword => {
                req.body.password = hashPassword
                knex('customer')
                    .where('email',req.email)
                    .update(req.body)
                    .then(() => {
                        knex('customer')
                            // req.email has email stored by verify middleware 
                            .where('email',req.email)
                            .then(userData => {
                                if (userData.length != 0) {
                                    delete userData[0].password
                                    return res.send(userData[0])
                                }
                                res.status(400).json({
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
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(error.error500)
                    })
            })
    }
    return res.status(400).send('invalid input!')
}

// update customerAddress
exports.putCustomerAddress = (req,res) => {
    // console.log(req.body)
    if (req.body.hasOwnProperty('address_1') && req.body.hasOwnProperty('city') && 
    req.body.hasOwnProperty('region') && req.body.hasOwnProperty('postal_code') &&
    req.body.hasOwnProperty('country') && req.body.hasOwnProperty('shipping_region_id')){
        return knex('customer')
            .where('email',req.email)
            .update(req.body)
            .then(() => {
                knex('customer')
                    .where('email',req.email)
                    .then(userData => {
                        if (userData.length != 0) {
                            delete userData[0].password
                            return res.send(userData[0])
                        }
                        res.status(400).json({
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
            })
    }
    res.status(400).send('invalid input!')
}

// update customer credit card
exports.putCustomerCreditCard = (req,res) => {
    if (req.body.hasOwnProperty('credit_card')) {
        return knex('customer')
            .where('email',req.email)
            .update(req.body)
            .then(() => {
                knex('customer')
                    .where('email',req.email)
                    .then(userData => {
                        if (userData.length != 0) {
                            delete userData[0].password
                            return res.send(userData[0])
                        }
                        res.status(400).json({
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
            })
    }
    res.status(400).send('invalid input!')
}
