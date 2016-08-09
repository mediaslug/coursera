 //grab necessary things
var mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
var Schema = mongoose.Schema

/* Schema leader declartion part  */
var leaderSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true  },
  designation: { type: String, required: true },
  abbr: { type: String, required: true  },
  description: { type: String, required: true }
}, {
  timestamps: true
})

 
// we need to create a model using it
var Leaders = mongoose.model('Leader', leaderSchema);

// make this for Node application
module.exports = Leaders
