const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const {loggerInfo} = require('../models/Logger.js')
const { serviceGetAllProducts, 
        serviceGetProductByID,
        servicePutProductByID,
        servicePostProduct,
        serviceDeleteProductByID
 } = require('../services/productsService.js')
async function controllerGraphQLGetAllProducts (req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        let products = await serviceGetAllProducts();
        res.status(200);
        res.json(products);
    }
    catch{
        res.status(500);      
        res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerGraphQLGetProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        if(+req.params.id){
            let buscado = await serviceGetProductByID(+req.params.id)
            res.status(200);
            res.json(buscado);
        }
        else{
            res.status(404);      
            res.json({ mensaje: `el id ${req.params.id} es inválido` });
        }
    }
    catch(error){
        res.status(500);      
        res.json({ mensaje: `${error}` });
    }
}
async function controllerGraphQLPutProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        if(+req.params.id){
            const item = {
                title: req.body.title,
                price: +req.body.price,
                thumbnail: req.body.thumbnail
            }
            await servicePutProductByID(+req.params.id, item);
            res.status(200);
            res.json(item);
        }
        else{
            res.status(404);      
            res.json({ mensaje: `el id ${req.params.id} es inválido` });
        }
    }
    catch{
        res.status(500);      
        res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerGraphQLPostProduct(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        const item = {
            title: req.body.title,
            price: +req.body.price,
            thumbnail: req.body.thumbnail
        }
        await servicePostProduct(item)
        //res.sendStatus(200) just sends status code
        res.status(201);
        res.json({mensaje: `el item ${req.body.title} fue agregado.`}) 
    }
    catch{
        res.status(500); //just sends status code
        res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerGraphQLDeleteProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        if(+req.params.id){
            await serviceDeleteProductByID(req.params.id);
            res.status(200).json({mensaje: `El item con id ${req.params.id} fue eliminado correctamente`})
        }
        else{
            res.status(404);      
            res.json({ mensaje: `el id ${req.params.id} es inválido.` });
        }
    }
    catch{
        res.status(500);      
        res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
exports.controllerGraphQLGetAllProducts = controllerGraphQLGetAllProducts;
exports.controllerGraphQLGetProductByID = controllerGraphQLGetProductByID;
exports.controllerGraphQLPutProductByID = controllerGraphQLPutProductByID;
exports.controllerGraphQLPostProduct = controllerGraphQLPostProduct;
exports.controllerGraphQLDeleteProductByID = controllerGraphQLDeleteProductByID;