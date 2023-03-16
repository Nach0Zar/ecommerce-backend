export default class Message {
    constructor ({id, author, message, dateMsg}){
        this.dateMsg = dateMsg;
        this.author = author;
        this.message = message;
        this.id = id;
    }
}