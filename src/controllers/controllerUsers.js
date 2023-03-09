const {loggerInfo} = require('../models/Logger.js')
const {serviceRegisterUser, serviceLoginUser} = require('../services/usersService.js')

async function registerUser(req, res){
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        await serviceRegisterUser(req.body.username, req.body.password1, req.body.password2);
        res.status(200).redirect('/')
    }
    catch(error){
        res.status(500).redirect('/api/error')
    }
}
async function loginUser(req, res) {
    const { url, method } = req
    loggerInfo(`Ruta ${method} ${url} implementada`)
    try{
        await serviceLoginUser(req.body.username)
        res.status(200).redirect('/')
    }
    catch(error){
        res.status(500).redirect('/api/error')
    }
}

exports.registerUser = registerUser;
exports.loginUser = loginUser;