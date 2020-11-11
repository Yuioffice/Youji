const mongoose = require('mongoose');
var MenuSchema = mongoose.Schema({
	id: Number,
	name: String,
	pre_id: Number,
	icon: String,
	orderby: Number,
	is_show:Number
})
var Menu = mongoose.model('Yjmenu', MenuSchema, 'yjmenu');

module.exports = Menu
