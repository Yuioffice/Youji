const mongoose = require('mongoose');
var IndexcontentSchema = mongoose.Schema({
 text:String,
 contentLists:{
 	  title:String,
 	  src:String,
 	  likes:String,
 	  username:String
 }
})
var Indexcontent = mongoose.model('Index_content',IndexcontentSchema,'index_content');

module.exports = Indexcontent