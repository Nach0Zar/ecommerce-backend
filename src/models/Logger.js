const pino = require('pino')
const streams = [
    {level: 'info', stream: process.stdout},
    {level: 'warn', stream: pino.destination(`warn.log`) },
    {level: 'error', stream: pino.destination(`error.log`) },

];
function buildProdLogger() {
    const prodLogger = pino({level: 'debug'}, pino.multistream(streams))
    return prodLogger
  }
  
  function buildDevLogger() {
    const devLogger = pino({level: 'info'}, pino.multistream(streams))
    return devLogger
  }
let logger = null

if (process.env.NODE_ENV === 'production') {
    logger = buildProdLogger()
} else {
    logger = buildDevLogger()
}
function loggerInfo(message){
    logger.info(message)
}
function loggerWarn(message){
    logger.warn(message)
}
function loggerError(message){
    logger.error(message)
}
exports.loggerInfo = loggerInfo;
exports.loggerWarn = loggerWarn;
exports.loggerError = loggerError;
  