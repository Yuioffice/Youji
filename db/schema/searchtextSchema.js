const mongoose = require('mongoose');

var SearchtextSchema = mongoose.Schema({
  text:String
})

var Searchtext = mongoose.model('Searchtext',SearchtextSchema,'searchtext');

module.exports = Searchtext