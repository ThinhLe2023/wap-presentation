const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://lequocthinh2010:992iSa7G4vRxJtDL@cluster0.rilzbpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then( client => {
        _db = client.db();
        callback();
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

