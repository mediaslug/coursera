// grab the things we need

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the comment schema, which will be embedded as a subdocument in the dishes schema

var favoriteSchema = new Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique:true
    },
    dishes: [{ type: mongoose.Schema.Types.ObjectId,unique: true, ref: 'Dish' }] //
},
   { timestamps: true}
                               );

// the schema is useless so far, we need to create a model using it
var Favorites = mongoose.model('Favorite', favoriteSchema);

// make this model available to code that imports it (other node applications)
module.exports = Favorites;
