class MessageContainer{
    #iDCounter;
    #fs;
    #items;
    #filePath;
    constructor(filePath, fs, items, iDCounter){
        this.#filePath = filePath;
        this.#items = items;
        this.#fs = fs;
        this.#iDCounter = iDCounter;
    }
    async deleteFile(){
        this.#fs.promises.unlink(this.#filePath)
        .then(()=>console.log("Información eliminada!"))
        .catch(()=>console.log("El archivo no fue encontrado"));
    }
    async writeData(stringToWrite){
        this.#fs.promises.writeFile(this.#filePath,stringToWrite)
        .then(()=>console.log("Información guardada!"))
        .catch(()=>console.log("Falló la carga de información"));
    }
    async saveDataOnFile(){
        this.deleteFile()
        .then(()=>this.writeData(JSON.stringify(this.#items)))
        .catch(()=>console.log("Falló el borrado de archivo"));
    }
    //save(object) : void
    async save(message){
        const object = {
            dateMsg: message.dateMsg,
            author: message.author,
            message: message.message,
            id: this.#iDCounter
        };
        console.log(object)
        this.#iDCounter++;
        this.#items.push(object);
        await this.saveDataOnFile();
    }
    //getById(number) : Object
    getById(id){
        //creates a new array (with the map function) containing only the IDs from the products, then indexes by ID and returns the item or null if the index was -1
        let index = this.#items.map((item => item.id)).indexOf(id);
        return (index !== -1) ? this.#items[index] : null;
    }
    modifyProductById(id, item){
        const newItem = {
            title: item.title,
            price: +item.price,
            thumbnail: item.thumbnail,
            id: +id
        };
        let index = this.#items.map((item => item.id)).indexOf(id);
        this.#items[index] = newItem;
    }
    //getAll() : Object[]
    getAll(){
        return this.#items;
    }
    //deleteById(Number): void
    deleteById(id){
        //creates a new array (with the map function) containing only the IDs from the products, then indexes by ID and deletes the item 
        let index = this.#items.map((item => item.id)).indexOf(+id);
        (index !== -1) && this.#items.splice(index,1);
    }
    getLength(){
        return this.#items.length;
    }
    //deleteAll() : void
    deleteAll(){
        this.#items = [];
    }
};
module.exports = MessageContainer