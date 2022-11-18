const ProductContainer = require('../models/container')
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
    return new ProductContainer(filepath, fs, items, iDCounter);
}
const container = controllerSetup();
function landingPage(req, res){
    res.render('form');
}
function postProduct(req, res){
    container.save(req.body);
    res.redirect('/');
}
function getProducts(req, res){
    let products = container.getAll();
    res.render('products', { products, productsExist: products.length > 0 });
}
exports.landingPage = landingPage;
exports.postProduct = postProduct;
exports.getProducts = getProducts;