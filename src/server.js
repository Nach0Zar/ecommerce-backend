const express = require('express');
const session = require('express-session');
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
const {randomUUID} = require('crypto')
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { SESSION_SECRET } = require('./config/sessionConfig');
const passport = require('passport');
const cookieParser = require('cookie-parser');
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
app.use(express.static('public'));
app.use(cookieParser())
//mongo
app.use(session({
    //mongo sessions
    // store: MongoStore.create({
    //     mongoUrl: `mongodb+srv://nachocoderhouse:passwordpassword@cluster0.hmqkdpj.mongodb.net/coderhouse`,
    //     ttl: 60 * 10
    // }),
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60 * 10
    },
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
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
    passport.authenticate('local-login', { failWithError: false, failureRedirect: '/api/error' }),
    loginUser);
app.post('/api/register',registerUser);
app.post('/api/logout',(req, res)=>{
    // req.session.destroy(err => {
    //     if (!err) res.status(200)
    //     else res.status(500)
    // })
    // res.redirect('/')
    res.clearCookie('id')
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
const port = 8080;
const server = httpServer.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
});
server.on("error", err => console.log(err));
