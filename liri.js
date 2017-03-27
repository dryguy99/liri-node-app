const twitK = require('./keys');

var twit = require('twitter');

const inquirer = require("inquirer");

const fs = require('fs');

const spotify = require('spotify');

const request = require('request');

var until = require('until');

var initInput = process.argv[2];

var initRequest;

if (process.argv.length >= 4) {
	initRequest = process.argv[3];
	console.log("initial request: " + initRequest);
}

switch (initInput) {
	case "my-tweets": 
		myTweets();
		break;
	case "spotify-this-song":
		mySpotify();
		break;
	case "movie-this":
		myOmdb();
		break;
	case "do-what-it-says":
		dowhatitSays();
		break;
	case "help":
		console.log("");
		console.log("===================================");
		console.log("");
		console.log("Please use the following commands:");
		console.log("");
		console.log("my-tweets");
		console.log(" > my-tweets : will print your last 20 tweets");
		console.log("");
		console.log("spotify-this-song '<song name here>'");
		console.log(" > spotify-this-song : will list the artist, song name, album & a spotify preview link");
		console.log("");
		console.log("movie-this '<movie name here>'");
		console.log(" > movie-this : will list the title, year, IMDB rating & other movie stats");
		console.log("");
		console.log("do-what-it-says");
		console.log(" > do-what-it-says : will run a random command");
		console.log("");
		console.log("===================================");
		console.log("");
		break;
	default:
		console.log("");
		console.log("===================================");
		console.log("Please use the following commands:");
		console.log("");
		console.log("my-tweets");
		console.log("spotify-this-song");
		console.log("movie-this");
		console.log("do-what-it-says");
		console.log("help");
		console.log("");
		console.log("===================================");
		console.log("");
}
//--------------------------------------------------------------
//function to handle twitter
function myTweets() {

}
//--------------------------------------------------------------
//function to handle spotify
function mySpotify() {

}
//--------------------------------------------------------------
// function to handle omdb
function myOmdb () {

}
//--------------------------------------------------------------
// function to handle do what it says
function dowhatitSays() {

}
//--------------------------------------------------------------
// twitter login information
// inquirer.prompt([
// 	{
// 		type: "input",
// 		message: "What would you like to do?"
// 		choices: ["My Tweets", "Spotify This Song", "Movie"]
// 	}
// ]);

// // questions for twitter login
// inquirer.prompt([

//   {
//     type: "input",
//     message: "What is your name?",
//     name: "name"
//   },

//   // Here we create a basic password-protected text prompt.
//   {
//     type: "password",
//     message: "Set your password",
//     name: "password"
//   },

//   // Here we give the user a list to choose from.
//   {
//     type: "list",
//     message: "Which Pokemon do you choose?",
//     choices: ["Bulbasaur", "Squirtle", "Charmander"],
//     name: "pokemon"
//   },

//   // Here we ask the user to confirm.
//   {
//     type: "confirm",
//     message: "Are you sure:",
//     name: "confirm",
//     default: true

//   }

// // Once we are done with all the questions... "then" we do stuff with the answers
// // In this case, we store all of the answers into a "user" object that inquirer makes for us.
// ]).then(function(user) {


//   // If we log that user as a JSON, we can see how it looks.
//   console.log(JSON.stringify(user, null, 2));

//   // If the user confirms, we displays the user's name and pokemon from the answers.
//   if (user.confirm) {

//     console.log("==============================================");
//     console.log("");
//     console.log("Welcome " + user.name);
//     console.log("Your " + user.pokemon + " is ready for battle!");
//     console.log("");
//     console.log("==============================================");

//   // If the user does not confirm, then a message is provided and the program quits.
//   }

//   else {

//     console.log("");
//     console.log("");
//     console.log("That's okay " + user.name + ", come again when you are more sure.");
//     console.log("");
//     console.log("");

//   }

// });