// Homework 1: dishRouter.js

// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// set up logging for dev environment
app.use(morgan('dev'));

var dishRouter = express.Router();


dishRouter.use(bodyParser.json());

// set up our default route
dishRouter.route('/')
.all( function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})

// retrieve a resource
.get(function(req, res, next){
    res.end("Will send you all of the dishes. Yee-haw!")
})

// post creates a resource
.post(function(req, res, next) {
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

// remove a resource
.delete(function(req, res, next) {
    res.end('Deleting all dishes');
});

// setup the route with a parameter
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


// export the dishRouter
module.exports = dishRouter;
