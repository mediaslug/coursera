var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {
    // get the documents collection
    var coll = db.collection(collection);

    // insert some documents
    coll.insert(document, function(err, result) {
        assert.equal(err,null);
        console.log('inserted ' + result.result.n + 'documents into the document collection' + collection)
        callback(result);
    });
};

exports.findDocuments = function(db, collection, callback) {
    // get the documents collection
    var coll = db.collection(collection);

    // find all documents
    coll.find({}).toArray(function(err, docs) {
        assert.equal(err,null);
        callback(docs);
    }) ;
};

exports.removeDocument = function(db, document, collection, callback) {
    // get the documents collection
    var coll = db.collection(collection);

    // delete the document
    coll.deleteOne(document, function(err, result){
        assert.equal(err, null);
        console.log('Removed the document ' + document);
        callback(result);
    });
};

exports.updateDocument = function(db, document, update, collection, callback) {
    // get the documents collection
    var coll = db.collection(collection);

    // Update the document
    coll.updateOne(document, { $set:update}, null, function(err, result) {
        assert.equal(err,null);
        console.log('Updated the document with ' + update);
        callback(result);
    });
};
