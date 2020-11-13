'use strict'

const knex = require('../util/database');
const error = require('../util/errorHandler');


// get all taxes
exports.getAllTaxes = (req,res) => {
    knex('tax')
        .then(taxesData => {
            if (taxesData != 0) {
                return res.send(taxesData)
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

// get tax by id
exports.getTaxById = (req,res) => {
    const taxId = req.params.tax_id
    knex('tax')
        .where('tax_id',taxId)
        .then(taxData => {
            if (taxData.length != 0) {
                return res.send(taxData[0])
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

