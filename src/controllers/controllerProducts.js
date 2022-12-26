const { faker } = require('@faker-js/faker');
faker.locale = 'es'

//this is the productContainer using memory and FS
const ProductContainer = require('../models/productContainer')
const fs = require('fs')
function controllerSetup(){
    let filepath = __dirname+"/../productos.txt";
    let iDCounter;
    let items;
    //if file doesn't exists or if it is empty
    if(!fs.existsSync(filepath) || fs.readFileSync(filepath,'utf8').length == 0){
        iDCounter = 0;
        items = [];
    }
    else{
        //loads previous items to the list
        items = JSON.parse(fs.readFileSync(filepath,'utf8'))
        //gets the highest ID and assigns the counter that value+1 to be the next ID to assign.
        iDCounter = Math.max(...items.map(item => item.id))+1;
    }
    return new ProductContainer(filepath, fs, items, iDCounter);
}
// const ContainerDB = require("../models/ContainerDB");
// //this is the productContainer using DB
// function controllerSetup(){
//     return new ContainerDB('products');
// }
const productContainer = controllerSetup();
function controllerGetAllProducts (req, response){
    try{
        response.status(200);
        response.json(productContainer.getAll());
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
function controllerGetProductByID(req, response){
    try{
        if(+req.params.id){
            const buscado = productContainer.getById(+req.params.id);
            if(!buscado){    
                response.status(404);      
                response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
            }
            else{
                response.status(200);
                response.json(buscado);
            }
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
function controllerPutProductByID(req, response){
    try{
        if(+req.params.id){
            const buscado = productContainer.getById(+req.params.id);
            if(!buscado){    
                response.status(404);      
                response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
            }
            else{
                const item = {
                    title: req.body.title,
                    price: +req.body.price,
                    thumbnail: req.body.thumbnail
                }
                productContainer.modifyByID(+req.params.id, item)
                response.status(200);
                response.json(req.body);
            }
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
function controllerGetProductsFaker(req, response){
    let fakeProducts = []
    for (let i = 0; i < 5; i++){
        let fakeProduct = {
            title: faker.word.noun(),
            price: +faker.datatype.number(),
            thumbnail: faker.internet.domainName()
        };
        fakeProducts.push(fakeProduct)
    }
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
function controllerPostProduct(req, response){
    try{
        const item = {
            title: req.body.title,
            price: +req.body.price,
            thumbnail: req.body.thumbnail
        }
        productContainer.save(item)
        //response.sendStatus(200) just sends status code
        response.status(200);
        response.json({mensaje: `el item ${req.body.title} fue agregado.`}) 
    }
    catch{
        response.status(500); //just sends status code
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
function controllerDeleteProductByID(req, response){
    try{
        if(+req.params.id){
            if(!productContainer.getById(+req.params.id)){
                response.status(404);      
                response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
            } 
            else{   
                productContainer.deleteById(req.params.id);
                response.status(200);    
                response.json({mensaje: `el item con el id ${req.params.id} fue eliminado.`}) 
            }
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
exports.productContainer = productContainer;