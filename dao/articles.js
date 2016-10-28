var database = require('../db.js');
let articles = {};
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
                callback();
            });
        }
    );
};
articles.get = function(callback){
    database((db)=>{
            let articles = db.collection("articles");
            articles.find({},{sort: [['created_date','desc']]},function(err,result){
                result.toArray().then(function(docs,err){
                    callback(docs);
                });
            });
        }
    );
};
module.exports = articles;