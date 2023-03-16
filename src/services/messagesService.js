const { container } = require('../containers/messageFactory.js')
const messageContainer = container;
function serviceGetMessageList(){
    return messageContainer.getMessageList();
}
async function servicePostMessage(message){
    await messageContainer.save(message);
}
exports.serviceGetMessageList = serviceGetMessageList;
exports.servicePostMessage = servicePostMessage;
exports.messageContainer = messageContainer;