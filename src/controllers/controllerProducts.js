const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const {loggerInfo} = require('../models/Logger.js')
const { serviceGetAllProducts, 
        serviceGetProductByID,
        servicePutProductByID, 
        serviceGetProductsFaker,
        servicePostProduct,
        serviceDeleteProductByID
 } = require('../services/productsService.js')
async function controllerGetAllProducts (req, res){
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
async function controllerGetProductByID(req, res){
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
async function controllerPutProductByID(req, res){
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
async function controllerGetProductsFaker(req, res){
    let fakeProducts = serviceGetProductsFaker();
    res.status(200);
    res.json(fakeProducts);
}
// function controllerGetAmmountOfProducts(req, res){
//     try{
//         //res.sendStatus(200) just sends status code
//         res.status(200);    
//         res.send(productContainer.getLength().toString());
//     }
//     catch{
//         res.status(500); //just sends status code
//         res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
//     }
// }
// function controllerGetRandomProduct(req, res){
//     try{
//         //res.sendStatus(200) just sends status code
//         res.status(200);    
//         res.json(productContainer.getRandomProduct());
//     }
//     catch{
//         res.status(500); //just sends status code
//         res.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
//     }
// }
async function controllerPostProduct(req, res){
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
async function controllerDeleteProductByID(req, res){
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
exports.controllerGetAllProducts = controllerGetAllProducts;
exports.controllerGetProductByID = controllerGetProductByID;
exports.controllerPutProductByID = controllerPutProductByID;
// exports.controllerGetAmmountOfProducts = controllerGetAmmountOfProducts
// exports.controllerGetRandomProduct = controllerGetRandomProduct;
exports.controllerPostProduct = controllerPostProduct;
exports.controllerDeleteProductByID = controllerDeleteProductByID;
exports.controllerGetProductsFaker = controllerGetProductsFaker;