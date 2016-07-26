// Exercise Introduction to Express Part 2b
/*

In this exercise, you will develop a web server that exports a REST API. You will use   the Express framework, and the Express router to implement the server.

Use the Express Router in Express framework to support REST API

 */

// Setting up a REST API


var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');


var hostname = 'localhost'
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all( function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})

// retrieve a resource
.get(function(req, res, next){
    res.end("Will send all of the dishes to you.")
})

// post creates a resource
.post(function(req, res, next) {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

// remove a resource
.delete(function(req, res, next) {
    res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.get(function(req, res, next){
    res.end('Will send you the details of ' + req.params.dishId + ' to you.')
})

.put(function(req, res, next){
    res.write('Updating the dish ' +  req.params.dishId + '\n');
    res.end('Will update the dish, named:  ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
    res.end('Deleting dish: ' + req.params.dishId)
});

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
    console.log(`server running at http://${hostname}:${port}`);
})

