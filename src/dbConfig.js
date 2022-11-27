const createKnexClient = require('knex');
const dbConfig = createKnexClient({
    client: 'mysql2',
    connection: 'mysql://root:@localhost:3306/coderhouse'
});
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