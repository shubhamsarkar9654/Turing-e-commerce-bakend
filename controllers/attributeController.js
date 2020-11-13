'use strict'

const knex = require('../util/database')
const error = require('../util/errorHandler');


// get all attributes
exports.getAttributes = (req,res) => {
    knex('attribute')
        .then(attributes => {
            res.send(attributes)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// get attribute by attribute_id
exports.getAttributeById = (req,res) => {
    const attributesId = req.params.attribute_id
    knex('attribute')
        .where('attribute_id',attributesId)
        .then(attribute => {
            if (attribute.length != 0){
                return res.send(attribute)
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

// get attributes values by attribute_id
exports.getAttributeValueByAttribute = (req,res) => {
    const attributeId = req.params.attribute_id
    knex('attribute_value').select('attribute_value.attribute_value_id','value')
        .where('attribute_id',attributeId)
        .then(attributeValues => {
            if (attributeValues.length != 0){
                return res.send(attributeValues)
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

// get attributes by product_id 
exports.getAttributesByProductId = (req,res) => {
    const productId = req.params.product_id
    knex('attribute')
        .join('attribute_value',function() {
            this.on('attribute.attribute_id','=','attribute_value.attribute_id')
        })
        .join('product_attribute',function() {
            this.on('attribute_value.attribute_value_id','=','product_attribute.attribute_value_id')
        })
        .where('product_id',productId)
        .select('attribute.name as attribute_name','attribute_value.attribute_value_id','attribute_value.value as attribute_value')
        .then(attributes => {
            if (attributes.length != 0){
                return res.send(attributes)
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
