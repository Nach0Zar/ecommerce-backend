const express = require('express');
const { routerApi } = require("./routers/routerApi.js");
//const { routerWeb } = require("./routers/routerWeb.js");
//const { engine } = require('express-handlebars');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { messageContainer } = require('./controllers/controllerMessages.js');
const { productContainer } = require('./controllers/controllerProducts.js');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
//socket.io
io.on('connection',(socket)=>{
    const messages = messageContainer.getAll();
    socket.emit('updateMessages', messages);
    socket.on('newMessage', (message)=>{
        messageContainer.save(message);
        io.sockets.emit('updateMessages', messages);
    });
    const products = productContainer.getAll();
    socket.emit('updateProducts', products);
    socket.on('newProduct', (product)=>{
        productContainer.save(product)
        io.sockets.emit('updateProducts', products);
    });
});
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
//views
//app.engine('handlebars', engine());
//app.set('view engine', 'handlebars');
//routes
app.use('/api/',routerApi); //to be used in the REST Api version
//app.use('/', routerWeb);    //to be used with handlebars
//server port listener
const port = 8080;
const server = httpServer.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
});
server.on("error", err => console.log(err));
