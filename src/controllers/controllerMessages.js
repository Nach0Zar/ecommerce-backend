const {loggerInfo} = require('../models/Logger.js')
const { serviceGetMessageList,
        servicePostMessage
} = require('../services/messagesService.js');
async function controllerGetAllMessages (req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        let messageList = await serviceGetMessageList();
        response.status(200);
        response.json(messageList);
    }
    catch{
        response.status(500);      
        response.json({ mensaje: `Hubo un problema interno del servidor, reintentar más tarde.` });
    }
}
async function controllerPostMessage(req, response){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        const message = {
            author: req.body.author,
            message: req.body.text,
            dateMsg: new Date().toLocaleString()
        }
        await servicePostMessage(message);
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