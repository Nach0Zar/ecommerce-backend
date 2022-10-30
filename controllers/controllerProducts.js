const Container = require('../classes/container')
const fs = require('fs')
let container;
function serverSetUp(){
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
    container = new Container(filepath, fs, items, iDCounter);
}

function controllerGetAllProducts (req, response){
    response.json(container.getAll());
}
function controllerGetProductByID(req, response){
    console.log(req.query)
    //req.query.min ?? X defaults values from query
    response.json(req.query);
}
function controllerPutProductByID(req, response){
    console.log(req.query)
    //req.query.min ?? X defaults values from query 
    response.json(req.query);
}
function controllerGetAmmountOfProducts(req, response){
    response.send(container.getLength().toString());
}
function controllerGetRandomProduct(req, response){
    response.json(container.getRandomProduct());
}
function controllerPostProduct(req, response){
    container.save(req.body)
    response.status(201)
    //response.sendStatus(201) just sends status code
    response.send(container.getAll())
}

exports.serverSetUp = serverSetUp;
exports.controllerGetAllProducts = controllerGetAllProducts;
exports.controllerGetProductByID = controllerGetProductByID;
exports.controllerPutProductByID = controllerPutProductByID;
exports.controllerGetAmmountOfProducts = controllerGetAmmountOfProducts
exports.controllerGetRandomProduct = controllerGetRandomProduct;
exports.controllerPostProduct = controllerPostProduct;