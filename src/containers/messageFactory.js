const { config } = require('../config/config.js');
const ContainerDB = require('./ContainerDB');
const messageContainer = require('./messageContainer');
const fs = require('fs')

let instance = null;

class MessageContainerFactory{
    constructor(){
        switch (config.PERSISTENCY) {
            case 'sql':
                this.container = new ContainerDB('messages');
                break;
            default:
                let filepath = __dirname+"/../mensajes.txt";
                let iDCounter;
                let items;
                //if file doesn't exists or if it is empty
                if(!fs.existsSync(filepath) || fs.readFileSync(filepath,'utf8').length == 0){
                    iDCounter = 0;
                    items = [];
                }
                else{
                    //loads previous items to the list
                    items = JSON.parse(fs.readFileSync(filepath,'utf8'))
                    //gets the highest ID and assigns the counter that value+1 to be the next ID to assign.
                    iDCounter = Math.max(...items.map(item => item.id))+1;
                }
                this.container = new messageContainer(filepath, fs, items, iDCounter);
                break;
        }   
    }
    static getInstance(){
        if(!instance){
            instance = new MessageContainerFactory();
        }
        return instance;
    }
}

let container = MessageContainerFactory.getInstance();
exports.container = container;