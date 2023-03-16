export default class Message {
    constructor ({id, author, message, dateMsg}){
        this.dateMsg = dateMsg;
        this.author = author;
        this.message = message;
        this.id = id;
    }
    //in this example it is the same the DTO and the BO, but this is supposed to be the BO.
}