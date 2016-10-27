/**
 * Created by Snoob on 9/29/2016.
 */
let [express,http,range,path,logger,bodyParser] =
    [require("express"),require("http"),require("range"),require("path"),require("morgan"),require("body-parser")];
let env = process.env;
let app = express();
let entries = [];
app.locals.entries = entries;
app.locals.range = range;
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static('public'));
app.set("view engine", "pug");
app.use(logger("tiny"));
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function(request, response) {
    reqLocal = response.locals;
    reqLocal.pageInfo =  {};
    reqLocal.pageInfo.title = "Snoob's Blog";
    reqLocal.active = false;
    response.render("index");
});
app.use(function(request, response) {
    reqLocal = response.locals;
    reqLocal.pageInfo =  {};
    reqLocal.pageInfo.title = "404 Error";
    reqLocal.active = false;
    response.status(404).render("404");
});
var server = http.createServer(app);
server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function() {
    console.log(`Blog started on port ${env.NODE_PORT || 3000}.`)
});