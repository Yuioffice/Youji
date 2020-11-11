const mongoose = require('mongoose');
var IndexSchema = mongoose.Schema({
  title:String,
  content:String,
  src:String
})
var Index = mongoose.model('Index',IndexSchema,'index');

module.exports = Index