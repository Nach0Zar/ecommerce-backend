const userContainerDB = require('../models/usersContainer.js')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const config = require('../config/config.js');
const jwt = require('jsonwebtoken')
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
function registerUser(req, res){
    if(req.body.password1 === req.body.password2){
        const user = {
            email: req.body.username,
            password: jwt.sign(req.body.password1, config.SESSION_SECRET)
        }
        userController.then((container)=>{
            container.getItemByEmail(user.email).then((userFound)=>{
                if(userFound === null){
                    container.save(user).then(()=>{
                        res.status(201).redirect('/');
                    })
                }
                else{
                    res.status(500).redirect('/api/error')
                }
            })
        })
    }
    else{
        res.status(500).redirect('/api/error')
    }
}
function loginUser(req, res) {
    userController.then((container)=>{
        container.getItemByEmail(req.body.username).then((item)=>{
            if(item){
                res.cookie('email', item.email, {maxAge: 60 * 10 * 1000})
                res.status(200).redirect('/')
            }
            else{
                res.status(500).redirect('/api/error')
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
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.userController = userController;