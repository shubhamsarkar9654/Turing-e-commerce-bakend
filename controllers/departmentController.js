'use strict'

const knex = require('../util/database')
const error = require('../util/errorHandler');


// get list of all departments
exports.getDepartments = (req,res) => {
    knex('department')
        .then(departments => {
            res.status(200).json(departments)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}

// get department by id
exports.getDepartment = (req,res) => {
    const departmentId = req.params.department_id
    knex('department')
        .where('department_id',departmentId)
        .then(department => {
            if (department.length != 0) {
                return res.status(200).json(department[0])
            }
            return res.status(404).json({
                message: 'No department available'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(error.error500)
        })
}
