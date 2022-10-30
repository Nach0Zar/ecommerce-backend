const express = require('express');
const { controllerGetAllProducts,
        controllerGetProductByID,
        controllerPutProductByID,
        controllerGetAmmountOfProducts,
        controllerGetRandomProduct,
        controllerPostProduct,
        controllerDeleteProductByID
 } = require('../controllers/controllerProducts')
 
const routerApi = express.Router();

routerApi.get('/productos',controllerGetAllProducts);
routerApi.get('/productos/:id',controllerGetProductByID);
routerApi.post('/productos',controllerPostProduct);
routerApi.put('/productos/:id',controllerPutProductByID);
routerApi.delete('/productos/:id', controllerDeleteProductByID);

routerApi.get('/cantidadProductos',controllerGetAmmountOfProducts);
routerApi.get('/productoRandom',controllerGetRandomProduct);

exports.routerApi = routerApi;