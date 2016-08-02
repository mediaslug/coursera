// Homework 1: leadershipRouter.js

// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();


// set up logging for dev environment
app.use(morgan('dev'));

var leadershipRouter = express.Router();


leadershipRouter.use(bodyParser.json());

// set up our default route
leadershipRouter.route('/')
.all( function(req,res,next) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
})

// retrieve a resource
.get(function(req, res, next){
    res.end("Will send you all of the leadership data!")
})

// post creates a resource
.post(function(req, res, next) {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

// remove a resource
.delete(function(req, res, next) {
    res.end('Deleting all leaders');
});

// setup the route with a parameter
leadershipRouter.route('/:leaderId')
.get(function(req, res, next){
    res.end('Will send you the details of leader id #' + req.params.leaderId + ' to you.')
})

.put(function(req, res, next){
    res.write('Updating the leader with id of ' +  req.params.leaderId + '\n');
    res.end('Will update the leader, named:  ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
    res.end('Deleting leader: ' + req.params.leaderId)
});


// export the leadershipRouter
module.exports = leadershipRouter;
