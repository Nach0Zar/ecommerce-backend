const express = require('express');
const { controllerGetAllMessages,
        controllerPostMessage
} = require('../controllers/controllerMessages');
const { controllerGetAllProducts,
        controllerGetProductByID,
        controllerPutProductByID,
        // controllerGetAmmountOfProducts,
        // controllerGetRandomProduct,
        controllerPostProduct,
        controllerDeleteProductByID,
        controllerGetProductsFaker
 } = require('../controllers/controllerProducts');
const { controllerGraphQLGetAllProducts,
        controllerGraphQLGetProductByID,
        controllerGraphQLPostProduct,
        controllerGraphQLPutProductByID,
        controllerGraphQLDeleteProductByID
} = require('../controllers/controllerProductsGraphQL');
const { calcularRandoms } = require('../api/calcularRandoms.js');
const routerApi = express.Router();
const {loggerInfo} = require('../models/Logger.js')
// routerApi.get('/productos',controllerGetAllProducts);
// routerApi.get('/productos/:id',controllerGetProductByID);
// routerApi.post('/productos',controllerPostProduct);
// routerApi.put('/productos/:id',controllerPutProductByID);
// routerApi.delete('/productos/:id', controllerDeleteProductByID);
routerApi.get('/productos',controllerGraphQLGetAllProducts);
routerApi.get('/productos/:id',controllerGraphQLGetProductByID);
routerApi.post('/productos',controllerGraphQLPostProduct);
routerApi.put('/productos/:id',controllerGraphQLPutProductByID);
routerApi.delete('/productos/:id', controllerGraphQLDeleteProductByID);
routerApi.get('/productos-test', controllerGetProductsFaker);
// routerApi.get('/cantidadProductos',controllerGetAmmountOfProducts);
// routerApi.get('/productoRandom',controllerGetRandomProduct);
routerApi.get('/messages',controllerGetAllMessages);
routerApi.post('/messages',controllerPostMessage);
routerApi.get('/sessionInfo',(req, res)=>{
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    if(req.cookies.email){
        res.json({username: req.cookies.email})
    }
    else{
        res.json({username: null})
    }
    res.status(200)
});
routerApi.get('/randoms', async (req, res) => {
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    const { cant = 100_000_000 } = req.query
    const result = await calcularRandoms(cant)
    res.json(result)
})
routerApi.get('/', (req, res, next) => {
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    res.send(`[pid: ${process.pid}] peticion recibida!`)
})
exports.routerApi = routerApi;