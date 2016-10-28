var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
// Connection URL
var url = (process.env.MONGODB_URL || 'mongodb://localhost:27017/') + 'myblog';
console.log(url);
var edb = null;
let connect = function(callback){
    if( edb == null || edb == undefined){
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            edb = db;
            callback(edb);
        });
    }else{
        callback(edb);
    }
}
// Use connect method to connect to the server


module.exports = connect;