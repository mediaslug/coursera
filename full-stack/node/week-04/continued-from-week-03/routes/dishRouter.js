// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');

// require the dish model
var Dishes = require('../models/dishes');
var Verify = require('./verify');

var app = express();




// set up logging for dev environment
app.use(morgan('dev'));

var dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// set up our default route
dishRouter.route('/')

// retrieve a resource
.get(function(req, res, next){

//    res.end("Will send you all of the dishes. Yee-haw!")
    Dishes.find(req.query)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) next (err);
        res.json(dish);
    });
})

// post creates a resource. we're going to create a new dish
.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
//    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);

    Dishes.create(req.body, function(err, dish) {
        if (err) next (err);
        console.log('dish created');

        // grab the id of the added dish, which is returned to the callback function
       var id = dish._id;

        // display message to end user
        res.writeHead(200, {'Content-type':'text/plain'});
        res.end('Added the dish with the id: ' + id);
    });
})

// remove all dishes
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
//    res.end('Deleting all dishes');
    Dishes.remove({}, function(err, resp) {
        if (err) next (err);
        res.json(resp);
    });
});

// setup the route with a parameter to grab a specific dish
dishRouter.route('/:dishId')
.get(function(req, res, next){
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) next (err);
        res.json(dish);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    res.write('Updating the dish ' +  req.params.dishId + '\n');
//    res.end('Will update the dish, named:  ' + req.body.name + ' with details: ' + req.body.description);
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, {
        new:true
    },  function (err, dish) {
        if (err) next (err);
        res.json(dish);
    });
})

// remove a specific dish
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    res.end('Deleting dish: ' + req.params.dishId)
    Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if (err) next (err);
        res.json(resp);
    });
});


// add a route to handle the comments
dishRouter.route('/:dishId/comments')

.get(function(req, res, next){
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) next (err);
        res.json(dish.comments);
    });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) next (err);
        req.body.postedBy = req.decoded._id;
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            if (err) next (err);
            console.log('updated comments!')
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if (err) next (err);
        for (var i=(dish.comments.length-1); i>=0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function(err, result) {
            if (err) next (err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("deleted all comments");
        });
    });
});


// act directly on individual comments
dishRouter.route('/:dishId/comments/:commentId')
.get(Verify.verifyOrdinaryUser, Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) next (err);
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) next (err);
        dish.comments.id(req.params.commentId).remove();
        req.body.postedBy = req.decoded._id;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) next (err);
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (dish.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }

        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) next (err);
            res.json(resp);
        });
    });
});

// export the dishRouter
module.exports = dishRouter;
