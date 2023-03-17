const { Product } = require('../models/Product');
const { container } = require('../containers/productFactory');

let instance = null;
class ProductsRepository {
    #dao
    constructor() {
        this.#dao = container
    }
    async getById(id) {
        const dto = await this.#dao.getById(id)
        if (!dto) return null
        return new Product(dto)
    }
    async save(product) {
        const res = await this.#dao.save(product)
        return res
    }
    async modifyProductById(id, newProduct){
        await this.#dao.modifyProductById(id, newProduct);
    }
    getAll(){
        return this.#dao.getAll();
    }
    deleteById(id){
        this.#dao.deleteById(id)
    }
    getRandomProduct(){
        return this.#dao.getRandomProduct();
    }
    getLength(){
        return this.#dao.getLength();
    }
    //deleteAll() : void
    deleteAll(){
        this.#dao.deleteAll();
    }
    static getInstance(){
        if(!instance){
            instance = new ProductsRepository();
        }
        return instance;
    }
}

let productRepository = ProductsRepository.getInstance();
exports.productRepository = productRepository;