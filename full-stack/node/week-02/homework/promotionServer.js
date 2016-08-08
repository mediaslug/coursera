var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

// create a new dish
    Promotions.create({
        name:'Weekend Grand Buffet',
        image:'images/buffet.png',
        label:'New',
        price:'19.99',
        description:'Featuring . . . '

    }, function(err, promotion) {
        if (err) {
            console.log(err);
        }
        console.log('promotion created');
        console.log(promotion);

        // grab the id
        var id = promotion._id;

        // get all the promotions
         setTimeout(function() {
            Promotions.findByIdAndUpdate(id, {
                $set: {
                    description:'updated test'
                }
            }, {
                new:true
            })
            .exec(function(err, promotion) {
                if (err) throw err;
                console.log('updated promotion');
                console.log(promotion);

                promotion.save(function(err, promotion) {
                    console.log('updated the comments');
                    console.log(promotion);
                    db.collection('promotions').drop(function() {
                      db.close();

                    });
                });
            });
        }, 3000)
    });
});
