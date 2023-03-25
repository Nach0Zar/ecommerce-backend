const {loggerInfo} = require('../models/Logger.js')
const {serviceRegisterUser, serviceLoginUser} = require('../services/usersService.js')

async function registerUser(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        await serviceRegisterUser(req.body.username, req.body.password1, req.body.password2);
        res.sendStatus(200);
    }
    catch(error){
        res.sendStatus(500);
    }
}
async function loginUser(req, res) {
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        await serviceLoginUser(req.body.username)
        res.cookie('email', req.body.username, {maxAge: 60 * 10 * 1000})
        res.sendStatus(200);
    }
    catch(error){
        res.status(500);
    }
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;