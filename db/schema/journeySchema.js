const mongoose = require('mongoose');
var JourneySchema = mongoose.Schema({
  url:String,
  word:String,
})
var Journey = mongoose.model('Journey',JourneySchema,'journey');

module.exports = Journey