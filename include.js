let lib =
    {express: require("express"),
    http: require("http"),
    range: require("range"),
    path: require("path"),
    logger: require("morgan"),
    bodyParser: require("body-parser"),
    redis : require("redis")};
module.exports = lib;