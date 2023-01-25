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
const mongoDBConfig = "mongodb+srv://nachocoderhouse:passwordpassword@cluster0.hmqkdpj.mongodb.net/coderhouse";
const mongoDBName = "coderhouse"
const { MongoClient } = require('mongodb');
const mongoClient = new MongoClient(mongoDBConfig);
await mongoClient.connect();
const mongoDatabase = mongoClient.db(mongoDBName)

exports.dbConfig = dbConfig;
exports.mongoDatabase = mongoDatabase;