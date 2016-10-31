let database = require('../db.js');
let redis = require('../include.js').redis;
let articles = {};
let cache = null;
redisOptions = {password:process.env.REDIS_PASSWORD || null};
sub = redis.createClient(redisOptions);pub = redis.createClient(redisOptions);
client = redis.createClient(redisOptions);
sub.subscribe("articles");
articles.onChange = function(callback){
    sub.on("message", function (channel, message) {
        if(channel === "articles" && message == 1){
            callback();
        }
    });
};
articles.onChange(function(){cache = null;})
articles.insert = function(title,author,content,callback){
    database((db)=>{
            let articles = db.collection("articles");
            articles.insertOne({
                title: title,
                author: author,
                content: content,
                created_date: new Date()
            },function(err,result){
                console.log("Inserted a document into the articles collection.");
                pub.publish("articles",1);
                callback();
            });
        }
    );
};
articles.get = function(callback){
            if(cache !== null){
                    callback(cache);
                }
            else {
                database((db) => {
                        let articles = db.collection("articles");
                        articles.find({}, {sort: [['created_date', 'desc']]}, function (err, result) {
                            result.toArray().then(function (docs, err) {
                                cache = docs;
                                callback(docs);
                            });
                        });
                    }
                );
            }
};
module.exports = articles;