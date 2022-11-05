const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const app = express()
const fs = require('fs')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//views
app.set('views', './views');
app.engine('ecommerce',async (filePath, options, callback)=>{
        try{
            const content = await fs.promises.readFile(filePath, 'utf-8');
            const rendered = content.toString()
            .replace('{{content}}', options.content)
            return callback(null, rendered);
        }
        catch(err){
            return callback(new Error (err));
        }
            
    })
app.get('/',(req,res)=>{
    res.render('index.ecommerce',{content: 'this is the content produced by the template'})
})

//routes
app.use('/api/',routerApi);

//server port listener
const port = 8080
const server = app.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
})
server.on("error", err => console.log(err))
