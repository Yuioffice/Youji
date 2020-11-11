const mongoose = require('mongoose');
var publishSchema = mongoose.Schema({
  text:String,
  content:String,
  userList:{
	  src:String,
	  name:String
  },
  imgList:Array
})
var Publish = mongoose.model('Publish',publishSchema,'publish');

module.exports = Publish