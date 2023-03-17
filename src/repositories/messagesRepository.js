const { Message } = require('../models/Message');
const { container } = require('../containers/messageFactory');

let instance = null
class MessagesRepository {
    #dao
    constructor() {
        this.#dao = container
    }
    getAll(){
        this.#dao.getAll();
    }
    save(message){
        this.#dao.save(message);
    }
    async getCantidadesCaracteresListas(){
        await this.#dao.getCantidadesCaracteresListas();
    }
    getMessageList(){
        return this.#dao.getMessageList();
    }
    deleteById(id){
        this.#dao.deleteById(id);
    }
    getLength(){
        return this.#dao.getLength();
    }
    //deleteAll() : void
    deleteAll(){
        this.#dao.deleteAll();
    }
    getDao(){
        return this.#dao;
    }
    static getInstance(){
        if(!instance){
            instance = new MessagesRepository();
        }
        return instance;
    }
}

let messageRepository = MessagesRepository.getInstance();
exports.messageRepository = messageRepository;