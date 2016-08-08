// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// create a schema for the leadership
var leadershipSchema = new Schema({
    name: {
        type:String,
        required: true,
        unique: false
    },
    image : {
        type:String,
        required:true
    },

     designation : {
        type:String,
        required:true,
    },

     abbr : {
        type:String,
        required:true
    },

    description: {
        type:String,
        required:true
    }
}, {
    timestamps:true
});

// the schema is useless so far, we need to create a model using it

var Leadership = mongoose.model('Leadership', leadershipSchema)

// make this leadership model available to code that imports it (other node applications)
module.exports = Leadership;
