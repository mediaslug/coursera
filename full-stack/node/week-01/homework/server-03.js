// Exercise Introduction to Express Part 2
/*

In this exercise, you will develop a web server that exports a REST API. You will use   the Express framework, and the Express router to implement the server. At the end of this exercise, you will be able to:

Use application routes in the Express framework to support REST API
 */

// Setting up a REST API


var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');


var hostname = 'localhost'
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});

// retrieve a resource
app.get('/dishes', function(req, res, next){
    res.end("We'll send all of the dishes to you.")
});

// post creates a resource
app.post('/dishes', function(req, res, next) {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

// remove a resource
app.delete('/dishes', function(req, res, next) {
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req, res, next){
    res.end('Will send you the details of ' + req.params.dishId + ' to you.')
});

app.put('/dishes/:dishId', function(req, res, next){
    res.write('Updating the dish ' +  req.params.dishId + '\n');
    res.end('Will update the dish, named:  ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next){
    res.end('Deleting dish: ' + req.params.dishId)
});


app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function() {
    console.log(`server running at http://${hostname}:${port}`);
})

