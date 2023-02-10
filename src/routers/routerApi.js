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
const { calcularRandoms } = require('../api/calcularRandoms.js');
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
routerApi.get('/sessionInfo',(req, res)=>{
    if(req.cookies.email){
        res.json({username: req.cookies.email})
    }
    else{
        res.json({username: null})
    }
    res.status(200)
});
routerApi.get('/login',(req, res)=>{
    res.render('login', {}, (err, html) => {
        (err) ? (res.redirect('error'), res.status(500)) : (res.send(html), res.status(200)); 
    });
});
routerApi.get('/register',(req, res)=>{
    res.render('register', {}, (err, html) => {
        (err) ? (res.redirect('error'), res.status(500)) : (res.send(html), res.status(200)); 
    });
});
routerApi.get('/error', (req, res)=>{
    res.render('error', {}, (err, html) => {
        (err) ? (res.redirect('error'), res.status(500)) : (res.send(html), res.status(200)); 
    });
});
routerApi.get('/randoms', async (req, res) => {
    const { cant = 100_000_000 } = req.query
    const result = await calcularRandoms(cant)
    res.json(result)
})
routerApi.get('/', (req, res, next) => {
    res.send(`[pid: ${process.pid}] peticion recibida!`)
})
exports.routerApi = routerApi;