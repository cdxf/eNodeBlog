library = require('./../include.js');
let {express,http,range,path,logger,bodyParser} = library;
var router = express.Router();
var marked = require('marked');
var articles = require('../dao/articles.js');
// define the admin route
router.get('/', function(req, res) {
    reqLocal = res.locals;
    reqLocal.pageInfo =  {};
    reqLocal.pageInfo.title = "Snoob's Blog";
    res.render('admin/main');
    res.end();
});
router.post('/post/create', function(req, res) {
    articles.insert("Title here","Snoob", req.body.content,function(){
        reqLocal = res.locals;
        reqLocal.pageInfo =  {};
        res.end(marked(req.body.content));
    });
});
module.exports = router;