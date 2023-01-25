const {randomUUID} = require('crypto')
const { dbConfig } = require('../config/dbConfig.js');
class ContainerDB{
    constructor(table) {
        this.client = dbConfig;
        this.table = table;
    }
    //save(object) : void
    async save(item){
        item.id = randomUUID();
        await this.client(this.table).insert(item);
    }
    //getById(number) : Object
    async getById(id){
        return await this.client(this.table).select('*').where('id','=',id);
    }
    async modifyByID(id, item){
        return await this.client(this.table).where('id','=',id).update(item);
    }
    //getAll() : Object[]
    async getAll(){
        return  await this.client(this.table).select('*');
    }
    //deleteById(Number): void
    async deleteById(id){
        return await this.client(this.table).where('id','=',id).del();
    }
    //deleteAll() : void
    async deleteAll(){
        return await this.client(this.table).del();
    }
};
module.exports = ContainerDB