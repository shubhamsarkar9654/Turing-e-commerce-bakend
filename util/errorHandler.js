'use strict'

exports.error500 = {
    "error": {
        "code": "USR_02",
        "message": "The field example is empty.",
        "field": "example",
        "status": 500
    }
}

exports.error400 = {
    "error": {
        "status": 400,
        "code": "DEP_02",
        "message": "Doesn't exist department with this ID.",
        "field": "department_id"
    }
}

exports.errorEccessUnauth = {
    "error": {
        "status": 400,
        "code": "DEP_02",
        "message": "Don'exist department with this ID.",
        "field": "department_id"
    }
}

exports.errorInvalidInput = {
    "error": {
        "status": 400,
        message: "invalid input"
    }
}
