const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://db_user:vqb7mc6jkUut4KaJ@cluster0.c1e4gsl.mongodb.net/?retryWrites=true&w=majority')
    .then( client => {
        _db = client.db();
        callback(client);
    }
    ).catch( err => {
        console.log(err);
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

