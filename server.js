
//require dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//set up port 
var PORT = process.env.PORT || 3000;

//instantiate express app
var app = express();

//set up express router 
var router = express.Router();

//require routes file pass router object 
require("./config/routes")(router);

//designate public folder as static dir
app.use(express.static(__dirname + "/public"));

//connect handlebars to express app
app.engine("handlebars", expressHandlebars ({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyParser in app
app.use(bodyParser.urlencoded ({
    extended: false
}));

//to have every request go through router middleware
app.use(router);

//if deployed use deployed database, otherwise use the local mongoHeadlines databse
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to database 
mongoose.connect(MONGODB_URI, function(error) {
    //this logs any errors with mongoose
    if(error) {
        console.log(error);
    } 
    //logs success message with mongoose
    else {
        console.log("mongoose connection was successful");
    }
});

//listen on port
app.listen(PORT, function() {
    console.log("listening to port:" + PORT);
});