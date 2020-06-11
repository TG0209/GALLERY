var express = require("express");
var router  = express.Router();
var pics = require("../models/pics");

// gallery page
router.get("/",function(req,res){
	pics.find({},function(err,allpics){
		if(err){
			console.log(err);
		}
		else{
			res.render("pics",{pics:allpics});
		}
	});

})

// about page
router.get("/about",function(req,res){
	res.render("about");
});

// contact us
router.get("/contact",function(re,res){
	res.render("contact");
})
// form to add
router.get("/new",function(req,res){
	res.render("new");	
});

// add new picture

router.post("/",function(req,res){
	var name = req.body.name;
	var img = req.body.image;
	var obj = {name:name,image:img};
	pics.create(obj,function(err,campgrounds){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/pictures");	
		}
	});
	
	
});

// delete picture

router.delete("/:id",function(req,res){
	pics.findByIdAndRemove(req.params.id,req.body.campground,function(err,deletepics){
		if(err){
			res.redirect("/pictures");
		}
		else{
			res.redirect("/pictures");
		}
	});
});

module.exports = router;