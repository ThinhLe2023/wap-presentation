const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const db_connect = process.env.DB_CONNECT;
let _db;

console.log("db_connect: ", db_connect);

const mongoConnect = (callback) => {
    MongoClient.connect(db_connect)
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

