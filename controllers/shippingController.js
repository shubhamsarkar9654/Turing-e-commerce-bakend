'use strict'

const knex = require('../util/database')
const error = require('../util/errorHandler');


// get shipping regions
exports.getShippingRegions = (req,res) => {
    knex('shipping_region')
        .then(data => {
            if (data.length != 0) {
                return res.send(data) 
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

// get shipping_region by id
exports.getShippingRegionsById = (req,res) => {
    const shippingRegionId = req.params.shipping_region_id
    knex('shipping_region')
        .where('shipping_region_id',shippingRegionId)
        .then(data => {
            if (data.length != 0) {
                return res.send(data[0]) 
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