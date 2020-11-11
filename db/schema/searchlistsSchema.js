const mongoose = require('mongoose');
var SearchlistsSchema = mongoose.Schema({
  text:String,
  searchLists:{
	  title:String,
	  src:String,
	  add:String,
	  username:String
  }
})

var Searchlists = mongoose.model('Searchlists',SearchlistsSchema,'searchlists');

module.exports = Searchlists
