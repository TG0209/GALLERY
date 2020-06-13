var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
	res.render("landing");
})

// Auth routes

// register
router.get("/register",function(req,res){
	res.render("register");
});

// register to datbase
router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser, req.body.password ,function(err,user){
		if(err){
			return res.render("register");
		}
		passport.authenticate("local")(req , res, function(){
			
			res.redirect("/pictures");	
		});
	});
});

// login form
router.get("/login",function(req,res){
	res.render("login");
});

// login logic
router.post("/login",passport.authenticate("local",{
	successRedirect : "/pictures",
	failureRedirect : "/login"
}),function(req,res){
	
});

// logout

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/pictures");
});



module.exports = router;