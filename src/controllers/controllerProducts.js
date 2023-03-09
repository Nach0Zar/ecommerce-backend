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
async function controllerGetAllProducts (req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        let products = await serviceGetAllProducts();
        response.status(200);
        response.json(products);
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerGetProductByID(req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        if(+req.params.id){
            let buscado = await serviceGetProductByID(+req.params.id)
            response.status(200);
            response.json(buscado);
        }
        else{
            response.status(404);      
            response.json({ mensaje: `el id ${req.params.id} es inválido` });
        }
    }
    catch(error){
        response.status(500);      
        response.json({ mensaje: `${error}` });
    }
}
async function controllerPutProductByID(req, response){
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
            response.status(200);
            response.json(item);
        }
        else{
            response.status(404);      
            response.json({ mensaje: `el id ${req.params.id} es inválido` });
        }
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerGetProductsFaker(req, response){
    let fakeProducts = serviceGetProductsFaker();
    response.status(200);
    response.json(fakeProducts);
}
// function controllerGetAmmountOfProducts(req, response){
//     try{
//         //response.sendStatus(200) just sends status code
//         response.status(200);    
//         response.send(productContainer.getLength().toString());
//     }
//     catch{
//         response.status(500); //just sends status code
//         response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
//     }
// }
// function controllerGetRandomProduct(req, response){
//     try{
//         //response.sendStatus(200) just sends status code
//         response.status(200);    
//         response.json(productContainer.getRandomProduct());
//     }
//     catch{
//         response.status(500); //just sends status code
//         response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
//     }
// }
async function controllerPostProduct(req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        const item = {
            title: req.body.title,
            price: +req.body.price,
            thumbnail: req.body.thumbnail
        }
        await servicePostProduct(item)
        //response.sendStatus(200) just sends status code
        response.status(200);
        response.json({mensaje: `el item ${req.body.title} fue agregado.`}) 
    }
    catch{
        response.status(500); //just sends status code
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerDeleteProductByID(req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        if(+req.params.id){
            await serviceDeleteProductByID(req.params.id);
            response.status(200).json({mensaje: `El item con id ${req.params.id} fue eliminado correctamente`})
        }
        else{
            response.status(404);      
            response.json({ mensaje: `el id ${req.params.id} es inválido.` });
        }
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
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