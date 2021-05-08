//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}));


mongoose.connect("mongodb+srv://admin:simplelist135@cluster0.0wtpw.mongodb.net/SL?retryWrites=true&w=majority", {useUnifiedTopology: true})

const userSchema = {
	name: String,
	iotid: String,
	email: String,
	password: String
};

const user = new mongoose.model("users", userSchema);

app.get("/", function (req, res){
	res.render("home");
});

app.get("/login", function (req, res){
	res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", function (req, res){
	res.sendFile(__dirname + "/views/register.html");
});

app.post("/register", function (req, res){
	const newUser = new user({
		name: req.body.name,
		iotid: req.body.iotid,
		email: req.body.username,
		password: req.body.password
	});
	newUser.save(function(err){
		if(err){
			console.log(err)
		}
		else{
			res.send();
		}
	});
});


let port = process.env.PORT;
if(port == null || port ==""){
	port = 3000;
}
app.listen(port);
