var mongoose = require("mongoose");

var picsSchema = new mongoose.Schema({
	name : String,
	image:String,
	
});


module.exports = mongoose.model("pics",picsSchema);
