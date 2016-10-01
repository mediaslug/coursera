// grab the things we need

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


// create a schema for the promotion
var promotionSchema = new Schema({
    name: {
        type:String,
        required: true,
        unique: false
    },
    image : {
        type:String,
        required:true
    },

     label : {
        type:String,
        required:true,
        default:''
    },

     price : {
        type:Currency,
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

var Promotions = mongoose.model('Promotion', promotionSchema)

// make this promotions model available to code that imports it (other node applications)
module.exports = Promotions;
