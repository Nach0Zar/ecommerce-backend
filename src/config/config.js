const dotenv = require('dotenv');
const parseArgs = require('minimist');

dotenv.config()

const argv = parseArgs(process.argv.slice(2), { alias: { p: 'port' }, default: { port: 8080 } })
