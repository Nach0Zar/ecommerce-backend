const userContainerDB = require('../models/usersContainer.js')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const jwt = require('jsonwebtoken')
const config = require('../config/config.js');
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
    //const user = Object.values(users).find(u => u.id === id)
    const user = userController.then((container)=>container.getItemByID(id))
    done(null, user)
}
async function serviceRegisterUser(email, password, password2){
    if(password === password2){
        const user = {
            email: email,
            password: jwt.sign(password, config.SESSION_SECRET)
        }
        userController.then((container)=>{
            container.getItemByEmail(user.email).then((userFound)=>{
                if(userFound === null){
                    container.save(user).then(()=>{
                        res.status(201).redirect('/');
                    })
                }
                else{
                    throw new Error('Error on register')
                }
            })
        })
    }
    else{
        throw new Error('Error on register')
    }
}
async function serviceLoginUser(username) {
    userController.then((container)=>{
        container.getItemByEmail(username).then((item)=>{
            if(item){
                res.cookie('email', item.email, {maxAge: 60 * 10 * 1000})
            }
            else{
                throw new Error("Failed to login")
            }
        })
    })

}
passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        userController.then((container)=> {
            container.getItemByEmail(username).then((user)=>{
                const originalPassword = jwt.verify(user?.password, SESSION_SECRET)
                if (password !== originalPassword) {
                    return done(null, false)
                }
                done(null, user)
                })
            })
            //const user = users[username]
    })
)
exports.serializeUserMongo = serializeUserMongo;
exports.deserializeUserMongo = deserializeUserMongo;
exports.serviceRegisterUser = serviceRegisterUser;
exports.serviceLoginUser = serviceLoginUser;
exports.userController = userController;