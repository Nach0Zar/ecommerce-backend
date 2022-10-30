const Container = require('../classes/container')
const fs = require('fs')
function controllerSetup(){
    let filepath = "./productos.txt";
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
    return new Container(filepath, fs, items, iDCounter);
}
const container = controllerSetup();

function controllerGetAllProducts (req, response){
    try{
        response.status(200);
        response.json(container.getAll());
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
function controllerGetProductByID(req, response){
    try{
        if(+req.params.id){
            const buscado = container.getById(+req.params.id);
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
            const buscado = container.getById(+req.params.id);
            if(!buscado){    
                response.status(404);      
                response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
            }
            else{
                container.modifyProductById(+req.params.id, req.body)
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
function controllerGetAmmountOfProducts(req, response){
    try{
        //response.sendStatus(200) just sends status code
        response.status(200);    
        response.send(container.getLength().toString());
    }
    catch{
        response.status(500); //just sends status code
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
function controllerGetRandomProduct(req, response){
    try{
        //response.sendStatus(200) just sends status code
        response.status(200);    
        response.json(container.getRandomProduct());
    }
    catch{
        response.status(500); //just sends status code
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
function controllerPostProduct(req, response){
    try{
        container.save(req.body)
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
            if(!container.getById(+req.params.id)){
                response.status(404);      
                response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
            } 
            else{   
                container.deleteById(req.params.id);
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
exports.controllerGetAmmountOfProducts = controllerGetAmmountOfProducts
exports.controllerGetRandomProduct = controllerGetRandomProduct;
exports.controllerPostProduct = controllerPostProduct;
exports.controllerDeleteProductByID = controllerDeleteProductByID;