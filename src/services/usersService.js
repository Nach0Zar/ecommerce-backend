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
async function serviceRegisterUser(email, password, password2, res){
    if(password === password2){
        const user = {
            email: email,
            password: jwt.sign(password, process.env.SESSION_SECRET)
        }
        userController.then((container)=>{
            container.getItemByEmail(user.email).then((userFound)=>{
                if(userFound === null){
                    container.save(user).then(()=>{
                        return;
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
async function serviceLoginUser(username, res) {
    userController.then((container)=>{
        container.getItemByEmail(username).then((item)=>{
            if(item){
                return
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
                const originalPassword = jwt.verify(user?.password, process.env.SESSION_SECRET)
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