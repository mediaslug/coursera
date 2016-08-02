// Homework 1: promotionsRouter.js

// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// set up logging for dev environment
app.use(morgan('dev'));

var promotionsRouter = express.Router();


promotionsRouter.use(bodyParser.json());

// set up our default route
promotionsRouter.route('/')
.all( function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})

// retrieve a resource
.get(function(req, res, next){
    res.end("Will send you all of the promotions!")
})

// post creates a resource
.post(function(req, res, next) {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

// remove a resource
.delete(function(req, res, next) {
    res.end('Deleting all promotions');
});

// setup the route with a parameter
promotionsRouter.route('/:promotionId')
.get(function(req, res, next){
    res.end('Will send you the details of promotion #' + req.params.promotionId + ' to you.')
})

.put(function(req, res, next){
    res.write('Updating the promotion with id of ' +  req.params.promotionId + '\n');
    res.end('Will update the promotion, named:  ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
    res.end('Deleting promotion: ' + req.params.leaderId)
});


// export the promotionsRouter
module.exports = promotionsRouter;
