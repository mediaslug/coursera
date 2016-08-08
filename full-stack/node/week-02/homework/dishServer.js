var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

// create a new dish
    Dishes.create({
        name:'Uthapizza3',
        image:'images/uthapizza.png',
        category:'mains',
        label:'Hot',
        price:'4.99',
        description:'A unique . . . ',
        comments: [
            {
                rating:3,
                comment: "this is insane",
                author: "matt daemon"
            }
        ]
    }, function(err, dish) {

        if (err) throw err;
        console.log('dish created: ' + dish._id);
        console.log(dish);

        // grab the id
        var id = dish._id;

        // get the dishes
        setTimeout(function() {
            Dishes.findByIdAndUpdate(id, {
                $set: {
                    description:'updated test'
                }
            }, {
                new:true
            })
            .exec(function(err, dish) {
                if (err) throw err;
                console.log('updated dish');
                console.log(dish);
                dish.comments.push({
                    rating: 5,
                    comment: 'I\'m getting a sinking feeling!',
                    author: "Leonard di Carpaccio"
                });

                dish.save(function(err, dish) {
                    console.log('updated the comments');
                    console.log(dish);
                    db.collection('dishes').drop(function() {
                      db.close();

                    });
                });
            });
        }, 3000)
    });
});
