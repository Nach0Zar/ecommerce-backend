const createKnexClient = require('knex');
const { config } = require('./config.js');
const dbConfig = createKnexClient(config.mysql);
dbConfig.schema.hasTable('products').then( async exists => {
    if(!exists){
        await dbConfig.schema.createTable('products', table => {
            table.string('id').primary()
            table.string('title')
            table.integer('price')
            table.string('thumbnail')
        })
    }
})
dbConfig.schema.hasTable('messages').then( async exists => {
    if(!exists){
        await dbConfig.schema.createTable('messages', table => {
            table.string('id').primary()
            table.string('author')
            table.string('message')
            table.string('dateMsg')
        })
    }
})
exports.dbConfig = dbConfig;