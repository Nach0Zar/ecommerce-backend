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
async function serviceGetAllProducts (){
    return productContainer.getAll();
}
async function serviceGetProductByID(id){
    const buscado = productContainer.getById(id);
    if(!buscado){    
        throw new Error(`no se encontró el producto con el id ${id}`)
    }
    else{
        response.status(200);
        response.json(buscado);
    }
}
async function servicePutProductByID(id, item){
    const buscado = productContainer.getById(id);
    if(!buscado){    
        throw new Error(`no se encontró el producto con el id ${id}`)
    }
    else{
        await productContainer.modifyByID(id, item)
    }
}
function serviceGetProductsFaker(){
    let fakeProducts = []
    for (let i = 0; i < 5; i++){
        let fakeProduct = {
            title: faker.word.noun(),
            price: +faker.datatype.number(),
            thumbnail: faker.internet.domainName(),
            id: i
        };
        fakeProducts.push(fakeProduct)
    }
    return fakeProducts;
}
async function servicePostProduct(item){
    await productContainer.save(item)
}
async function serviceDeleteProductByID(id){
    if(!(await productContainer.getById(id))){
        throw new Error(`no se encontró el producto con el id ${id}`)
    } 
    else{   
        await productContainer.deleteById(id);
    }
}
exports.serviceGetAllProducts = serviceGetAllProducts;
exports.serviceGetProductByID = serviceGetProductByID;
exports.servicePutProductByID = servicePutProductByID;
exports.servicePostProduct = servicePostProduct;
exports.serviceDeleteProductByID = serviceDeleteProductByID;
exports.serviceGetProductsFaker = serviceGetProductsFaker;