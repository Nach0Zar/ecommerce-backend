const { MongoClient } = require('mongodb');
const mongoDBConfig = "mongodb+srv://nachocoderhouse:passwordpassword@cluster0.hmqkdpj.mongodb.net/coderhouse";
const mongoDBName = "coderhouse"
async function mongoDBSetup(){
    const mongoClientInstance = new MongoClient(mongoDBConfig);
    await mongoClientInstance.connect();
    const mongoDatabase = mongoClientInstance.db(mongoDBName);
    return mongoDatabase;
}
exports.mongoDBSetup = mongoDBSetup;