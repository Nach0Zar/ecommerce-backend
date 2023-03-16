const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const { container } = require('../containers/productFactory');

const productContainer = container;
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