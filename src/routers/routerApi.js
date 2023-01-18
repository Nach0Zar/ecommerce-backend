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
const routerApi = express.Router();
routerApi.get('/productos',controllerGetAllProducts);
routerApi.get('/productos/:id',controllerGetProductByID);
routerApi.post('/productos',controllerPostProduct);
routerApi.put('/productos/:id',controllerPutProductByID);
routerApi.delete('/productos/:id', controllerDeleteProductByID);
routerApi.get('/productos-test', controllerGetProductsFaker);
// routerApi.get('/cantidadProductos',controllerGetAmmountOfProducts);
// routerApi.get('/productoRandom',controllerGetRandomProduct);
routerApi.get('/messages',controllerGetAllMessages);
routerApi.post('/messages',controllerPostMessage);
routerApi.post('/login',(req, res)=>{
    req.session.username = req.body.username
    res.status(200)
    res.redirect('/')
})
routerApi.post('/logout',(req, res)=>{
    req.session.destroy(err => {
        if (!err) res.status(200)
        else res.status(500)
    })
    res.redirect('/')
})
routerApi.get('/sessionInfo',(req, res)=>{
    if(req.session.username){
        res.json(req.session)
    }
    else{
        res.json({username: null})
    }
    res.status(200)
})
exports.routerApi = routerApi;