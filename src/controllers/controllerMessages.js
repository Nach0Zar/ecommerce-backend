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
function controllerGetAllMessages (req, response){
    try{
        response.status(200);
        response.json(messageContainer.getAll());
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerPostMessage(req, response){
    try{
        const message = {
            author: req.body.author,
            message: req.body.text,
            dateMsg: new Date().toLocaleString()
        }
        await messageContainer.save(message);
        response.status(200);
        response.redirect('/');
    }
    catch{
        response.status(500); //just sends status code
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
exports.controllerGetAllMessages = controllerGetAllMessages;
exports.controllerPostMessage = controllerPostMessage;
exports.messageContainer = messageContainer;