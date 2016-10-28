let {express,http,range,path,logger,bodyParser} = require('./../include.js');
var router = express.Router();
var marked = require('marked');
var articles = require('../dao/articles.js');
var moment = require('moment');
moment.locale("vi");
router.get("/", function(request, response) {
    let locals = response.locals;
    locals.pageInfo =  {};
    locals.pageInfo.title = "Snoob's Blog";
    locals.active = false;
    articles.get(
        (docs)=> {
            locals.articles = docs;
            console.log(docs);
            locals.marked = marked;
            locals.moment = moment;
            response.render("index");
        }
    );

});

module.exports = router;