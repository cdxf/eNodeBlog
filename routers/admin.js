library = require('./../include.js');
let {express,http,range,path,logger,bodyParser} = library;
var router = express.Router();

// define the admin route
router.get('/', function(req, res) {
    reqLocal = res.locals;
    reqLocal.pageInfo =  {};
    reqLocal.pageInfo.title = "Snoob's Blog";
    res.render('admin/main');
    res.end();
});

module.exports = router;