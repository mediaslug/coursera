// grab the things we need
var mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
var Schema = mongoose.Schema
var Currency = mongoose.Types.Currency

/* Promotion Schema declaration part*/
var promoSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true  },
  label: { type: String, required: false,default: '' },
  price: { type: Currency, required: true  },
  description: { type: String, required: true }
}, {
  timestamps: true
})

 
//  create a model using it
var Promotions = mongoose.model('Promotion', promoSchema);

// make this for Node application
module.exports = Promotions
