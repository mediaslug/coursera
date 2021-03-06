// leadershipRouter.js

// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var Leadership = require('../models/leadership');


// set up logging for dev environment
app.use(morgan('dev'));

var leadershipRouter = express.Router();


leadershipRouter.use(bodyParser.json());

// set up our default route
leadershipRouter.route('/')


// retrieve a resource
.get(function(req, res, next){
//    res.end("Will send you all of the leadership data!")
    Leadership.find({}, function(err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

// post creates a resource
.post(function(req, res, next) {
//    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
    Leadership.create(req.body, function(err, leader) {
        if (err) throw err;
        console.log('leader created');

        var id = leader._id;

        // display message to end user
        res.writeHead(200, {'Content-type':'text/plain'});
        res.end('Added the dish with the id: ' + id);
    })
})

// remove a resource
.delete(function(req, res, next) {
//    res.end('Deleting all leaders');
    Leadership.remove({}, function(err, resp) {
       if (err) throw err;
        res.json(resp);
    })
});

// setup the route with a parameter
leadershipRouter.route('/:leaderId')
.get(function(req, res, next){
//    res.end('Will send you the details of leader id #' + req.params.leaderId + ' to you.')
    Leadership.find(req.params.leaderId, function(err, leaders) {
        res.json(leaders)

    })
})

.put(function(req, res, next){
//    res.write('Updating the leader with id of ' +  req.params.leaderId + '\n');
//    res.end('Will update the leader, named:  ' + req.body.name + ' with details: ' + req.body.description);
    Leadership.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
        }, {
        new:true
        },  function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(function(req, res, next){
//    res.end('Deleting leader: ' + req.params.leaderId)
    Leadership.remove(req.params.leaderId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    })
});


// export the leadershipRouter
module.exports = leadershipRouter;
