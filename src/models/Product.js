export default class Product {
    constructor ({id, title, price, thumbnail}){
        this.title = title;
        this.price = +price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
    //in this example it is the same the DTO and the BO, but this is supposed to be the BO.
}