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
    response.json(container.getAll());
}
function controllerGetProductByID(req, response){
    if(+req.params.id){
        const buscado = container.getById(+req.params.id);
        if(!buscado){    
            response.status(404);      
            response.json({ mensaje: `no se encontró el producto con el id ${req.params.id}` });
        }
        else{
            response.json(buscado);
        }
    }
    else{
        response.status(404);      
        response.json({ mensaje: `el id ${req.params.id} es inválido` });
    }
}
function controllerPutProductByID(req, response){
    response.json(req.params.id);
}
function controllerGetAmmountOfProducts(req, response){
    response.send(container.getLength().toString());
}
function controllerGetRandomProduct(req, response){
    response.json(container.getRandomProduct());
}
function controllerPostProduct(req, response){
    try{
        container.save(req.body)
        response.sendStatus(200) //just sends status code
    }
    catch{
        response.sendStatus(500) //just sends status code
    }
}

exports.controllerGetAllProducts = controllerGetAllProducts;
exports.controllerGetProductByID = controllerGetProductByID;
exports.controllerPutProductByID = controllerPutProductByID;
exports.controllerGetAmmountOfProducts = controllerGetAmmountOfProducts
exports.controllerGetRandomProduct = controllerGetRandomProduct;
exports.controllerPostProduct = controllerPostProduct;