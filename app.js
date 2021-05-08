//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: true
}));


mongoose.connect("mongodb+srv://project:<password>@cluster0.04kga.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useUnifiedTopology: true})

const userSchema = {
	email: String,
	password: String
};

const user = new mongoose.model("Users", userSchema);

app.get("/", function (req, res){
	res.render("home");
});

app.get("/login", function (req, res){
	res.render("login");
});

app.get("/register", function (req, res){
	res.render("register");
});

app.post("/register", function (req, res){
	const newUser = new User({
		email: req.body.username,
		password: req.body.password
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


let port = process.env.PORT;
if(port == null || port ==""){
	port = 3000;
}
app.listen(port);
