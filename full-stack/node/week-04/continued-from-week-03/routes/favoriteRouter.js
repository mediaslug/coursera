// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');

// require the favorites model
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var app = express();


// set up logging for dev environment
app.use(morgan('dev'));

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

// set up our default route
favoriteRouter.route('/')

//.all( function(req, res, next) {
//    next();
//})

// retrieve a resource
.get(Verify.verifyOrdinaryUser, function(req, res, next){

//    res.end("Will send you all of the dishes. Yee-haw!")
    Favorites.find({})
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

// post creates a resource. we're going to create a new list for favorites
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    userId = req.decoded._doc._id;
    newFavoriteId = req.body._id;

    // find the favorite created by a specific user
    // push the dish onto the dishes array
//    Favorites.findOneAndUpdate({"postedBy": req.decoded._doc._id }, { $push: { dishes: req.body._id}}, {upsert:true},
//      function (err, favorites) {
//         if (err) console.log (err);
////         res.end("Favorite has been added");
//
//    });



    Favorites.find({"postedBy": userId }).exec(
        function (err, favorites) {
            if (err) console.log (err)

            if (!favorites.length) {
                console.log("will need to add a new list of favorites for this user");
                Favorites.create({
                    "postedBy": req.decoded._doc._id,
                    "dishes": req.body._id},
                    function(err, favorite) {
                        if (err) throw err;
                        console.log('favorite created');
                        // display message to end user
                        res.json(favorite);
                    });
            } else {
                // there is already a favorite for this user
                console.log("there is already at least one favorite for this user");
                if (favorites[0].dishes.indexOf(newFavoriteId) != -1) {
                    favoriteAlreadyExists = true;
                } else {
                    favoriteAlreadyExists = false;
                }

                if (!favoriteAlreadyExists) {
                    // add the favorite to the array
                    favorites[0].dishes.push(newFavoriteId);
                    favorites[0].save(function(err, result) {
                        if (err) throw err;
                        console.log(result);
                    })
                }

                // add the dish to the array if the dish is not already in the array
//                for (i=0; i<favorites[0].dishes.length-1; i++) {
//                    // grab an elemet from the dishes array
//                    console.log("array element is " + favorites[0].dishes[i])
//                    if ( newFavoriteId == favorites[0].dishes[i]) {
//                        console.log("already in the array");
//
//                    } else {
//                        favorites[0].dishes.push("foo");
//                        console.log("not a match")
//                    }
//                }

                res.json(favorites);
            }
    });




//    Favorites.create({"postedBy": req.decoded._doc._id,
    //    "dishes": req.body._id},
    //    function(err, favorite) {
//          if (err) throw err;
//          console.log('favorite created');
//
//          // grab the id of the added dish, which is returned to the callback function
//          var id = favorite._id;
//
//          // display message to end user
//          res.json(favorite);
//    });


})

// remove all dishes
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
//    res.end('Deleting all dishes');
    Dishes.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

// setup the route with a parameter to grab a specific dish
favoriteRouter.route('/:dishId')
.get(Verify.verifyOrdinaryUser, function(req, res, next){
//    res.end('Will send you the details of ' + req.params.dishId + ' to you.')
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) throw err;
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
        if (err) throw err;
        res.json(dish);
    });
})

// remove a specific dish
.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    res.end('Deleting dish: ' + req.params.dishId)
    Dishes.findByIdAndRemove(req.params.dishId, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


// add a route to handle the comments
favoriteRouter.route('/:dishId/comments')
.all(Verify.verifyOrdinaryUser)

.get(Verify.verifyOrdinaryUser, function(req, res, next){
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function(err, dish) {
        if (err) throw err;
        res.json(dish.comments);
    });
})

.post(function(req, res, next){
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function(err, dish) {
            if (err) throw err;
            console.log('updated comments!')
            res.json(dish);
        });
    });
})

.delete(Verify.verifyAdmin, function(req,res, next) {
    Dishes.findById(req.params.dishId, function(err, dish) {
        if (err) throw err;
        for (var i=(dish.comments.length-1); i>=0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save(function(err, result) {
            if (err) throw err;
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("deleted all comments");
        });
    });
});


// act directly on individual comments

favoriteRouter.route('/:dishId/comments/:commentId')
.all(Verify.verifyOrdinaryUser)

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Dishes.findById(req.params.dishId)
        .populate('comments.postedBy')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish.comments.id(req.params.commentId));
    });
})

.put(function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (err) throw err;
        dish.comments.id(req.params.commentId).remove();
        req.body.postedBy = req.decoded._doc._id;
        dish.comments.push(req.body);
        dish.save(function (err, dish) {
            if (err) throw err;
            console.log('Updated Comments!');
            res.json(dish);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Dishes.findById(req.params.dishId, function (err, dish) {
        if (dish.comments.id(req.params.commentId).postedBy
           != req.decoded._doc._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }

        dish.comments.id(req.params.commentId).remove();
        dish.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});



// export the favoriteRouter
module.exports = favoriteRouter;
