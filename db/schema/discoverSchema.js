const mongoose = require('mongoose');
var DiscoverSchema = mongoose.Schema({
  text:String,
  contentLists:{
	  title:String,
	  src:String,
	  address:String,
	  name:String
  }
})
var Discover = mongoose.model('Discover',DiscoverSchema,'discover');

module.exports = Discover