 //import or declare things needed
var mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
var Schema = mongoose.Schema
var Currency = mongoose.Types.Currency

/* Comment Schema for comments  */
var commentSchema = new Schema({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  author: { type: String, required: true }
}, {
  timestamps: true
})

/* Dish Schema declaration  */
var dishSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String,required: false, },
  category: { type: String,required: true,  },
  label: { type: String,required: false, default: '' },
  price: { type: Currency,required: true,   },
  description: { type: String, required: true },
  comments: [commentSchema]
}, {
  timestamps: true
})

 
//  create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

// make this for Node application
module.exports = Dishes
