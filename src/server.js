const express = require('express');
const session = require('express-session');
const cluster = require ('cluster');
const { Server } = require('./models/Server.js')
//const MongoStore = require('connect-mongo');
const { routerApi } = require("./routers/routerApi.js");
//const { routerWeb } = require("./routers/routerWeb.js");
//const { engine } = require('express-handlebars');
//const { ejs } = require('ejs')
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { messageContainer } = require('./controllers/controllerMessages.js');
const { productContainer } = require('./controllers/controllerProducts.js');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { config } = require('./config/config.js');
const compression = require('compression')
const { 
    serializeUserMongo, 
    deserializeUserMongo, 
    registerUser,
    loginUser } = require('./controllers/controllerUsers.js')
//socket.io
io.on('connection',async (socket)=>{
    let messages = await messageContainer.getAll();
    let cantidades = await messageContainer.getCantidadesCaracteresListas()
    socket.emit('updateMessages', messages, cantidades);
    socket.on('newMessage', async(message)=>{
        await messageContainer.save(message);
        messages = await messageContainer.getAll();
        let cantidades = await messageContainer.getCantidadesCaracteresListas()
        io.sockets.emit('updateMessages', messages, cantidades);
    });
    let products = await productContainer.getAll();
    socket.emit('updateProducts', products);
    socket.on('newProduct', async (product)=>{
        await productContainer.save(product);
        products = await productContainer.getAll();
        io.sockets.emit('updateProducts', products);
    });
});
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(express.static('public'));
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
    // res.redirect('/')
    res.clearCookie('email')
    res.sendStatus(200)
});
//views handlebars
//app.engine('handlebars', engine());
//app.set('view engine', 'handlebars');
//views 
app.set('view engine', 'ejs');
//routes
app.use('/api/',routerApi); //to be used in the REST Api version
//app.use('/', routerWeb);    //to be used with handlebars
//server port listener
app.get('/info',(req, res)=>{
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