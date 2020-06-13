var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	methodOverride = require("method-override"),
	User        = require("./models/user"),
	passport    = require("passport"),
	LocalStrategy = require("passport-local")


var pictureRoutes    = require("./routes/pics"),
	indexRoutes      = require("./routes/index")
    
mongoose.set('useUnifiedTopology', true);
// mongoose.connect("mongodb://localhost/photo_data", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://yelpcamp:tushar@cluster0-ktyjf.mongodb.net/gallery?retryWrites=true&w=majority", {useNewUrlParser: true,
 useCreateIndex : true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

// passport config
app.use(require("cookie-session")({
	secret:"fuck off",
	resave:false,
	saveUninitialized:false,
	
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use("/", indexRoutes);
app.use("/pictures",pictureRoutes);

app.listen(3000,function(){
	console.log("sever started!!");
});
