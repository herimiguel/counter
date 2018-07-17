// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
// create the express app
// this line is needed. it requires express-session (download it: npm install express-session)
var session = require('express-session');
var app = express();
// secret key is needed so make sure to put in here!
app.use(session({secret: 'codingdojorocks'}));
//looks for the "views" folder 
app.set('views', __dirname + '/views');
//these two lines are needed as well. always have them
app.set('view engine', 'ejs'); 

app.get('/', function(req, res) {
    console.log(req.session)
    var counter = 0;
    if(req.session.counter){
        req.session.counter += 0;
    }
    else{
        req.session.counter = 0;
    } 
    res.render("index", {counter: req.session.counter});
})
app.get('/add', function(req, res){
    req.session.counter += 2;
    res.redirect('/');
})

app.get('/reset', function(req, res){
    req.session.counter = 0 ;
    res.redirect('/');
})
//
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// post route for adding a user
app.post('/users', function(req, res) {
 console.log("POST DATA", req.body);
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/');
})
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
