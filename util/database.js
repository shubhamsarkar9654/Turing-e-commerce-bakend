'use strict'

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'banner',
        database: 'turing'
    },
    pool: {min: 0,max: 7}
},console.log('database connected through knex on local host...'))