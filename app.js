//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
const md5 = require('md5');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://project:project123456789@cluster0.04kga.mongodb.net/myDatabase?retryWrites=true&w=majority", {useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = {
	email: String,
	password: String,
	secret: String
};

// userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
	res.render("home");
});

app.get("/login", function(req, res){
	res.render("login");
});

app.get("/register", function(req, res){
	res.render("register");
});

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()){
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/submit", function(req, res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
    res.redirect("/login");
  }
});

app.post("/submit", function(req, res){
  const submittedSecret = req.body.secret;

  
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

app.post("/register", function(req, res){
	const newUser = new User({
		email: req.body.username,
		password: md5(req.body.password)
	});
	
	newUser.save(function(err){
		if(err){
			console.log(err)
		}
		else{
			res.render("secrets");
		}
	});
});

app.post("/login", function(req, res){
	const username = req.body.username;
	const password = md5(req.body.password);

	User.findOne({email: username}, function(err, foundUser){
		if(err){
			console.log(err)
		}
		else{
			if(foundUser){
				if(foundUser.password === password){
					res.render("secrets");
				}
			}
		}
	});
});


let port = process.env.PORT;
if(port == null || port ==""){
	port = 3000;
}
app.listen(port);
