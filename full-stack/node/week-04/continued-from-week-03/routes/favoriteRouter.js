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

// retrieve a resource
.get(Verify.verifyOrdinaryUser, function(req, res, next){

//    res.end("Will send you all of the dishes. Yee-haw!")
    Favorites.find({"postedBy": req.decoded._doc._id})
        .populate('dishes')
        .populate('postedBy')
        .exec(function(err, favorites) {
        if (err) throw err;
        res.json(favorites);
    });
})

// post creates a resource. we're going to create a new list for favorites
.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    userId = req.decoded._doc._id;
    newFavoriteId = req.body._id;
    Favorites.find({"postedBy": userId }).exec(
        function (err, favorites) {
            if (err) console.log (err)

            if (!favorites.length) {
                // console.log("will need to add a new list of favorites for this user");
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
                if (favorites[0].dishes.indexOf(newFavoriteId) != -1) {
                    favoriteAlreadyExists = true;
                } else {
                    favoriteAlreadyExists = false;
                }

                if (!favoriteAlreadyExists) {
                    // add the favorite to the array
                    favorites[0].dishes.push(newFavoriteId);
                    favorites[0].save(function(err, result) {if (err) throw err;})
                }
                res.json(favorites);
            }
    });
})

// remove all favorites
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
    userId = req.decoded._doc._id;
    Favorites.remove({"postedBy": userId }, function(err, resp) {
        if (err) throw err;
        res.end("Favorites have been deleted");
    });
});

// setup the route with a parameter to grab a specific favorite
favoriteRouter.route('/:favoriteId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
    userId = req.decoded._doc._id;
    Favorites.find({"postedBy": userId}, function(err, favorites) {
        if (err) throw err;
        if (favorites[0].dishes.indexOf(req.params.favoriteId) != -1) {
            favorites[0].dishes.pull(req.params.favoriteId);
            favorites[0].save(function(err, result) {if (err) throw err;})
            res.json(favorites);
            res.end("Deleting the dish from your list of favorites " + req.params.favoriteId);
        } else {
            res.end("Could not find that dishId");
        }
    });
});

// export the favoriteRouter
module.exports = favoriteRouter;
