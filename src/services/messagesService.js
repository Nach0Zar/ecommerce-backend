const { messageRepository } = require('../repositories/messagesRepository.js')

let messageContainer = messageRepository.getDao();
function serviceGetMessageList(){
    return messageRepository.getMessageList();
}
async function servicePostMessage(message){
    await messageRepository.save(message);
}
exports.serviceGetMessageList = serviceGetMessageList;
exports.servicePostMessage = servicePostMessage;
exports.messageContainer = messageContainer;