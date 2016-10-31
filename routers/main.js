let {express,http,range,path,logger,bodyParser} = require('./../include.js');
var router = express.Router();
var marked = require('marked');
var articles = require('../dao/articles.js');
var moment = require('moment');
moment.locale("vi");
let cacheTemplate = null;
articles.onChange(function(){cacheTemplate = null;})
router.get("/", function(request, response) {
    let locals = response.locals;
    locals.pageInfo =  {};
    locals.pageInfo.title = "Snoob's Blog";
    locals.active = false;
    if(cacheTemplate !== null){
        response.end(cacheTemplate);
    }
    else {
        console.log("Render");
        articles.get(
            (docs)=> {
                locals.articles = docs;
                locals.marked = marked;
                locals.moment = moment;
                response.render("index",function(err,html){
                    cacheTemplate = html;
                    response.send(html);
                });

            }
        );
    }


});

module.exports = router;