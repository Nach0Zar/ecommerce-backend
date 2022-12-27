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
