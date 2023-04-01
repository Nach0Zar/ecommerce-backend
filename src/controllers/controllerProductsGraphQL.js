const {loggerInfo, loggerError} = require('../models/Logger.js')
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
        return await serviceGetAllProducts();
    }
    catch(error){
        loggerError(error);
        return null;
    }
}
async function controllerGraphQLGetProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        return await serviceGetProductByID(+req.params.id);
    }
    catch(error){
        loggerError(error);
        return null;
    }
}
async function controllerGraphQLPutProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        const item = {
            title: req.body.title,
            price: +req.body.price,
            thumbnail: req.body.thumbnail
        }
        return await servicePutProductByID(+req.params.id, item);
    }
    catch(error){
        loggerError(error);
        return null;
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
        return await servicePostProduct(item); 
    }
    catch(error){
        loggerError(error);
        return null;
    }
}
async function controllerGraphQLDeleteProductByID(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        return await serviceDeleteProductByID(req.params.id);
    }
    catch(error){
        loggerError(error);
        return null;
    }
}
exports.controllerGraphQLGetAllProducts = controllerGraphQLGetAllProducts;
exports.controllerGraphQLGetProductByID = controllerGraphQLGetProductByID;
exports.controllerGraphQLPutProductByID = controllerGraphQLPutProductByID;
exports.controllerGraphQLPostProduct = controllerGraphQLPostProduct;
exports.controllerGraphQLDeleteProductByID = controllerGraphQLDeleteProductByID;