const express = require('express');
const session = require('express-session');
const cluster = require ('cluster');
const { Server } = require('./models/Server.js')
//const MongoStore = require('connect-mongo');
const { routerApi } = require("./routers/routerApi.js");
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { config } = require('./config/config.js');
const compression = require('compression')
const {loggerInfo, loggerWarn, loggerError} = require('./models/Logger.js')
const { 
    registerUser,
    loginUser } = require('./controllers/controllerUsers.js')
const { 
    serializeUserMongo, 
    deserializeUserMongo } = require('./services/usersService.js')
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());
//mongo
app.use(session(config.SESSION));
//PASSPORT
app.use(passport.initialize());
passport.serializeUser((user, done) => {
    serializeUserMongo(user, done)
});
passport.deserializeUser((id, done) => {
    deserializeUserMongo(id, done);
});
app.use(passport.session());
app.post('/api/login',
    passport.authenticate('local-login', { failWithError: true, failureRedirect: '/api/error' }),
    loginUser);
app.post('/api/register',registerUser);
app.post('/api/logout',(req, res)=>{
    // req.session.destroy(err => {
    //     if (!err) res.status(200)
    //     else res.status(500)
    // })
    res.clearCookie('email')
    res.sendStatus(200)
});
//routes
app.use('/api/',routerApi); //to be used in the REST Api version
//server port listener
app.get('/info',(req, res)=>{
    loggerInfo(`Ruta ${method} ${url} implementada`)
    res.json({
        ARGS: config.ARGS,
        CPUS: config.CPUs,
        OS: config.OS,
        NODE_VERSION: config.NODE_VERSION,
        RSS: config.RSS,
        PATH: config.PATH,
        PROCESS_ID: config.PROCESS_ID,
        PROJECT_FOLDER: config.PROJECT_FOLDER
    })
    res.status(200)
});
app.get('/infozip', compression(), (req, res)=>{
    loggerInfo(`Ruta ${method} ${url} implementada`)
    res.json({
        ARGS: config.ARGS,
        CPUS: config.CPUs,
        OS: config.OS,
        NODE_VERSION: config.NODE_VERSION,
        RSS: config.RSS,
        PATH: config.PATH,
        PROCESS_ID: config.PROCESS_ID,
        PROJECT_FOLDER: config.PROJECT_FOLDER
    })
    res.status(200)
});
app.all('*', (req, res)=>{
    const { url, method } = req
    loggerWarn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no está implementada`)
    res.status(404)
})
if (config.MODE === 'cluster') {
    if (cluster.isPrimary) {
        console.log('modo de ejecucion: CLUSTER')
        console.log(`proceso primario: pid ${process.pid}`)
        for (let i = 0; i < config.CPUs; i++) {
            cluster.fork();
        }
        cluster.on('exit', () => {
            cluster.fork();
        })
    } else {
        console.log(`proceso secundario: pid ${process.pid}`)
        const servidor = new Server(app)
        servidor.conectar({ puerto: config.PORT })
    }
} else {
    const servidor = new Server(app)
    servidor.conectar({ puerto: config.PORT })
    console.log(`Successfully connected to port ${config.PORT}`)
}
app.on('error', error => loggerError(`Error en servidor: ${error}`))