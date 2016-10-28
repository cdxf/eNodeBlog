let {express,http,range,path,logger,bodyParser} = require('./../include.js');
var router = express.Router();

router.get("/", function(request, response) {
    reqLocal = response.locals;
    reqLocal.pageInfo =  {};
reqLocal.pageInfo.title = "Snoob's Blog";
reqLocal.active = false;
response.render("index");
});

module.exports = router;