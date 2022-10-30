const express = require('express');
const { controllerGetAllProducts,
        controllerGetProductByID,
        controllerPutProductByID,
        controllerGetAmmountOfProducts,
        controllerGetRandomProduct,
        controllerPostProduct
 } = require('../controllers/controllerProducts')
 
const routerApi = express.Router();

routerApi.get('/productos',controllerGetAllProducts);
routerApi.get('/productos/:id',controllerGetProductByID);
routerApi.put('/productos/:id',controllerPutProductByID);
routerApi.post('/productos',controllerPostProduct);
routerApi.delete('/productos');

routerApi.get('/cantidadProductos',controllerGetAmmountOfProducts);
routerApi.get('/productoRandom',controllerGetRandomProduct);

exports.routerApi = routerApi;