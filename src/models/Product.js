export default class Product {
    constructor ({id, title, price, thumbnail}){
        this.title = title;
        this.price = +price;
        this.thumbnail = thumbnail;
        this.id = id;
    }
}