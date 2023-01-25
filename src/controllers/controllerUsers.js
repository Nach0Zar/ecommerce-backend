const userContainerDB = require('../models/usersContainer.js')
const {randomUUID} = require('crypto')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
async function controllerSetup(){
    const userController = new userContainerDB();
    await userController.setUp();
    return userController;
}
const userController = controllerSetup();
function serializeUserMongo(user, done){
    done(null, user.id);
}
function deserializeUserMongo(id, done){
    const user = userController.getItemByID(id)
    //const user = Object.values(users).find(u => u.id === id)
    done(null, user)
}
const users = {};
function registerUser(req, res){
    if(req.body.password1 === req.body.password2){
        const user = {
            username: req.body.username,
            password: req.body.password1
        }
        user.id = randomUUID();
        users[user.username] = user;

        res.status(201).redirect('/');
    }
    else{
        res.sendStatus(500);
    }
}
function loginUser(req, res) {
    res.cookie('id', users[req.body.username].id, {maxAge: 10000})
    res.status(200).redirect('/')
}
passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        const user = users[username]
        if (user?.password !== password) {
            return done(null, false)
        }
        done(null, user)
    })
)
exports.serializeUserMongo = serializeUserMongo;
exports.deserializeUserMongo = deserializeUserMongo;
exports.userController = userController;
exports.registerUser = registerUser;
exports.loginUser = loginUser;