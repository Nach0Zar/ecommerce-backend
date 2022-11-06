const express = require('express');
const { routerApi } = require("./routers/routerApi.js");
const { routerWeb } = require("./routers/routerWeb.js");
const { engine } = require('express-handlebars');
const app = express();
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
//routes
//app.use('/api/',routerApi);//to be used in the REST Api version
app.use('/', routerWeb);//to be used with handlebars
//server port listener
const port = 8080;
const server = app.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
});
server.on("error", err => console.log(err));
