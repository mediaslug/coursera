var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// connection url
var url = 'mongodb://localhost:27017/conFusion';

// use the connect method to connect to the server
MongoClient.connect(url, function(err, db) {
   assert.equal(err,null);
    console.log('connected correctly to the server');

    // create a reference to the dishes collection
    var collection = db.collection('dishes');

    // insert data (a document) into the collection
    collection.insertOne({name:"uthapizza", description: "test"}, function(err, result) {
        assert.equal(err, null);
        console.log("after the insert");
        console.log(result.ops);

        // query the collection
        // doing this here because we only want to query after we're certain
        // an insert has been done, so querying inside the insert funtion for this example
        collection.find({}).toArray(function(err,docs) {
            assert.equal(err, null);

            // show it
            console.log('Found: ');
            console.log(docs);

            // then drop this test only collection

            db.dropCollection('dishes', function(err, result) {
                assert.equal(err,null);
                db.close();
            });
        });
    });
});
