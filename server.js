const express = require('express');
const { routerApi } = require("./routers/routerApi.js");
const app = express();
const { engine } = require('express-handlebars');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//views
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');
// app.engine('html',async (filePath, options, callback)=>{
//         try{
//             const content = await fs.promises.readFile(filePath, 'utf-8');
//             const rendered = content.toString()
//             .replace('{{content}}', options.content)
//             return callback(null, rendered);
//         }
//         catch(err){
//             return callback(new Error (err));
//         }
            
//     })
// app.get('/',(req,res)=>{
//     res.render('index.html',{content: 'this is the content produced by the template'})
// })

//routes
app.use('/api/',routerApi);

//server port listener
const port = 8080
const server = app.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
})
server.on("error", err => console.log(err))
