'use strict'

const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const nastyToken = req.cookies.Bearer || req.headers['authoriztion']
    if (nastyToken) {
        // const token = nastyToken.split(' ')[1]
        if (nastyToken == null) return res.sendStatus(401)

        jwt.verify(nastyToken,'qwerty',(err,user) => {
            if (err) return res.sendStatus(403) 
            req.email = user.email
            next();
        })
    } else {
        res.send('cookies expire...')
    }
}

module.exports = verifyToken