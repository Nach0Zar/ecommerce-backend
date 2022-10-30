const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/',routerApi)

//server port listener
const port = 8080
const server = app.listen(port,()=>{
    console.log(`Successfully connected to port ${server.address().port}`)
})
server.on("error", err => console.log(err))
