var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

// create a new dish
    Leadership.create({
        name:'Peter Pan',
        image:'images/alberto.png',
        designation:'Chief Epicurious Officer',
        abbr:'CEO',
        description:'Our CEO, Peter, . . . '

    }, function(err, leader) {
        if (err) {
            console.log (err);
        }
        console.log('leader created');
        console.log(leader);

        // grab the id
        var id = leader._id;

        // get all the leaders
        setTimeout(function() {
            Leadership.findByIdAndUpdate(id, {
                $set: {
                    description:'updated test'
                }
            }, {
                new:true
            })
            .exec(function(err, leader) {
                if (err) throw err;
                console.log('updated leader');
                console.log(leader);

                leader.save(function(err, leader) {
                    console.log('updated the comments');
                    console.log(leader);
                    db.collection('leaderships').drop(function() {
                      db.close();

                    });
                });
            });
        }, 3000)
    });
});
