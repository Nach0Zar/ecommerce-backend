const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const {productRepository} = require('../repositories/productsRepository.js')
async function serviceGetAllProducts (){
    return productRepository.getAll();
}
async function serviceGetProductByID(id){
    const buscado = await productRepository.getById(id);
    if(!buscado){    
        throw new Error(`no se encontró el producto con el id ${id}`)
    }
    else{
        return buscado;
    }
}
async function servicePutProductByID(id, item){
    const buscado = productRepository.getById(id);
    if(!buscado){    
        throw new Error(`no se encontró el producto con el id ${id}`)
    }
    else{
        await productRepository.modifyByID(id, item)
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
    await productRepository.save(item)
}
async function serviceDeleteProductByID(id){
    if(!(await productRepository.getById(id))){
        throw new Error(`no se encontró el producto con el id ${id}`)
    } 
    else{   
        await productRepository.deleteById(id);
    }
}
exports.serviceGetAllProducts = serviceGetAllProducts;
exports.serviceGetProductByID = serviceGetProductByID;
exports.servicePutProductByID = servicePutProductByID;
exports.servicePostProduct = servicePostProduct;
exports.serviceDeleteProductByID = serviceDeleteProductByID;
exports.serviceGetProductsFaker = serviceGetProductsFaker;