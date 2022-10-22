const express = require('express')
const server = express()
server.get('/welcome',(petition, response) => {
    response.send('<h1>hi</h1>')
})
server.get('/json',(petition, response) => {
    response.json(`{title: "product1",price: 1250,thumbnail: "url1"}`)
})
function connect(port = 8080){
    return new Promise((resolve, reject)=>{
        const serverConnecter = server.listen(port, err => {
            (err) ? server.on("error", error => reject(err)) : resolve(serverConnecter)
        })
    })
}

module.exports = { connect }