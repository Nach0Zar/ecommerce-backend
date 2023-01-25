const userContainerDB = require('../models/usersContainer.js')
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
    //const user = Object.values(users).find(u => u.id === id)
    const user = userController.then((container)=>container.getItemByID(id))
    done(null, user)
}
function registerUser(req, res){
    if(req.body.password1 === req.body.password2){
        const user = {
            username: req.body.username,
            password: req.body.password1
        }
        userController.then((container)=>{
            container.save(user).then(()=>{
                res.status(201).redirect('/');
            })
        })
    }
    else{
        res.sendStatus(500);
    }
}
function loginUser(req, res) {
    userController.then((container)=>{
        container.getItemByName(req.body.username).then((item)=>{
            res.cookie('id', item.id, {maxAge: 10000})
            res.status(200).redirect('/')
        })
    })

}
passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        userController.then((container)=> {
            container.getItemByName(username).then((user)=>{
                if (user?.password !== password) {
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