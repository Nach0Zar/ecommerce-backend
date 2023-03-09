const MessageContainer = require('../models/messageContainer')
const fs = require('fs')
function controllerSetup(){
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
    return new MessageContainer(filepath, fs, items, iDCounter);
}
// const ContainerDB = require("../models/ContainerDB");
// //this is the messageContainer using DB
// function controllerSetup(){
//     return new ContainerDB('messages');
// }
const messageContainer = controllerSetup();
function serviceGetMessageList(){
    return messageContainer.getMessageList();
}
async function servicePostMessage(message){
    await messageContainer.save(message);
}
exports.serviceGetMessageList = serviceGetMessageList;
exports.servicePostMessage = servicePostMessage;
exports.messageContainer = messageContainer;