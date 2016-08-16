// promotionsRouter.js

// Setting up a REST API
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');

// include the promotions model
var Promotions = require('../models/promotions')
var app = express();


// set up logging for dev environment
app.use(morgan('dev'));

var promotionsRouter = express.Router();


promotionsRouter.use(bodyParser.json());

// set up our default route
promotionsRouter.route('/')

// retrieve a resource
.get(function(req, res, next){
//    res.end("Will send you all of the promotions!")
    Promotions.find({}, function(err, promotion) {
        if(err) throw err;
        res.json(promotion)
    })
})

// post creates a resource
.post(function(req, res, next) {
//    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
    Promotions.create(req.body, function(err, promotion){
        if (err) throw err;
        console.log('promotion created');

        // grab the id of the added promotion
        var id = promotion._id;
        // display message to end user
        res.writeHead(200, {'Content-type':'text/plain'});
        res.end('Added the promotion with the id: ' + id);
    });

})

// remove all resources
.delete(function(req, res, next) {
    Promotions.remove({}, function(err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

// setup the route with a parameter
promotionsRouter.route('/:promotionId')
.get(function(req, res, next){
//     res.end('Will send you the details of promotion #' + req.params.promotionId + ' to you.')

    Promotions.findById(req.params.promotionId, function(err, promotion){
        console.log(promotion);
        if (err) throw err;
        res.json(promotion);

    });
})

// update a resource
.put(function(req, res, next){
//    res.write('Updating the promotion with id of ' +  req.params.promotionId + '\n');
//    res.end('Will update the promotion, named:  ' + req.body.name + ' with details: ' + req.body.description);
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, {
        new:true
    }, function(err, promotion){
        if (err) throw err;
        res.json(promotion);
    });

})

.delete(function(req, res, next){
//    res.end('Deleting promotion: ' + req.params.leaderId)
    Promotions.findByIdAndRemove(req.params.promotionId, function(err, resp) {
        if(err) throw err;
        res.json(resp);
    })
});


// export the promotionsRouter
module.exports = promotionsRouter;
