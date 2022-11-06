const express = require('express');
const { landingPage,
        postProduct,
        getProducts} = require('../controllers/controllerProductsWebApi');
const routerWeb = express.Router();
routerWeb.get('/', landingPage);
routerWeb.post('/productos', postProduct);
routerWeb.get('/productos', getProducts)
exports.routerWeb = routerWeb;