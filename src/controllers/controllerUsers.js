const userContainerDB = require('../models/usersContainer.js')
function controllerSetup(){
    return new userContainerDB();
}
const userContainer = controllerSetup();
exports.userContainer = userContainer;