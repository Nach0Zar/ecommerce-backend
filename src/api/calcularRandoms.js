const { fork } = require('child_process');
const path = require('path')
const { config } = require('../config/config.js')
function calcularRandoms(cantidad){
    return new Promise((resolve, reject) => {
        let jsPath;
        if(config.PATH.includes('src')){
            jsPath = config.PATH + '/scripts/randomNumberGenerator.js' 
        }
        else{
            jsPath = config.PATH + '/src/scripts/randomNumberGenerator.js'
        }
        const forked = fork(jsPath)
        forked.on('message', mensaje => {
            if (mensaje == 'ready') {
                forked.send(cantidad)
            } else {
                resolve(mensaje)
            }
        })
    })
}


exports.calcularRandoms = calcularRandoms;