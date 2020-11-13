'use strict'

const express = require('express');
const cookieParser = require('cookie-parser');

const departmentRoute = require('./routes/departmentRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const attributeRoute = require('./routes/attributeRoute');
const productRoute = require('./routes/productRoute');
const customerRoute = require('./routes/customerRoute');
const taxRoute = require('./routes/taxRoute');
const shoppingCartRoute = require('./routes/shoppingCartRoute');
const shippingRoute = require('./routes/shippingRoute');
const ordersRoute = require('./routes/ordersRoute');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res) => {
    res.status(200).send('Welcome to turing project...');
});
// order of writing turing endingpoints are as follows...
app.use('/departments',departmentRoute);//1
app.use('/categories',categoriesRoute);//2
app.use('/attributes',attributeRoute);//3
app.use('/products',productRoute);//4
app.use(customerRoute);//5
app.use('/tax',taxRoute);//6
app.use('/shipping/regions',shippingRoute);//7
app.use('/shoppingcart',shoppingCartRoute);//8
app.use('/orders',ordersRoute);//9

app.listen(3000,() => {
    console.log('server listing through 3000...');
});
