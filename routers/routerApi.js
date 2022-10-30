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
routerApi.get('/producto/:id',controllerGetProductByID)
routerApi.put('/producto/:id',controllerPutProductByID)
routerApi.get('/cantidadProductos',controllerGetAmmountOfProducts)
routerApi.get('/productoRandom',controllerGetRandomProduct)
routerApi.post('/producto',controllerPostProduct)

exports.routerApi = routerApi;