var twitk = require('./keys');
var twit = require('twitter');
//twitter api access key
var client = new twit({
  consumer_key: twitk.twitterKeys.consumer_key,
  consumer_secret: twitk.twitterKeys.consumer_secret,
  access_token_key: twitk.twitterKeys.access_token_key,
  access_token_secret: twitk.twitterKeys.access_token_secret
});

//search variables for twitter
var params = {screen_name: '@tjdry', count:20};
var searchField = 'statuses/user_timeline';

const inquirer = require("inquirer"),

	fs = require('fs'),

	spotify = require('spotify'),

	request = require('request');

var until = require('until'),
	initInput = process.argv[2],
	myRequest = "";

if (process.argv.length >= 4) {
	myRequest = process.argv[3];
	//console.log("initial request: " + myRequest);
}
//--------------------------------------------------------------
//append to log.txt file
function myAppend(temp) {
	fs.appendFile("log.txt", temp, (err) => {
	  	if (err) throw err;
	  	//console.log('The "data to append" was appended to file!');
	});
}
//--------------------------------------------------------------
// check which function to run and excute it
function checkInput(){
	tempInfo = initInput + ": "; //reset variable for log file
	myAppend(tempInfo); //append to log file
	tempinfo = ""; //reset variable for log file
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
}
// run checkInput once
checkInput();
//--------------------------------------------------------------
//function to handle twitter
function myTweets() {
	var tempInfo = ""; //reset variable for log file
	client.get(searchField, params, function(error, tweets, response) {
  		if (!error) {
  			// format results
  			for (i = 0; i < tweets.length; i++) {
  				console.log("\n==========================================");
  				console.log("");
  				console.log("Created: " + tweets[i].created_at);
    			console.log("Tweet " + (i+1) + " : " + tweets[i].text);
    			console.log("");
    			console.log("");
    			// set log file data
    			tempInfo = tempInfo + "Created: " + tweets[i].created_at + ", Tweet" + (i+1) + ": " + tweets[i].text + "~ ";
    		}
  		} else { 
  			console.log(error);
  		}
	  	myAppend(tempInfo); //append to log file
	});
}
//--------------------------------------------------------------
//function to handle spotify
function mySpotify() {
	var tempInfo = ""; //reset variable for log file
	//search for the sign by ace of base is no song title is entered
	if (myRequest === "") { myRequest = "The Sign Ace of Base"; }
	spotify.search({ type: 'track', query: myRequest }, function(err, data) {
    	if ( err ) {
        	console.log('Error occurred: ' + err);
        	return;
    	} else { //format results
    		console.log("==========================================");
  			console.log("");
    		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    		console.log("Song Title: " + data.tracks.items[0].name);
    		console.log("Preview Link: " + data.tracks.items[0].preview_url);
    		console.log("Album name: " + data.tracks.items[0].album.name);
    		console.log("");
    		console.log("==========================================");
			console.log("");
			//set log file data
			tempInfo = 	"Artist: " + data.tracks.items[0].album.artists[0].name +
						" Song Title: " + data.tracks.items[0].name +
						" Preview Link: " + data.tracks.items[0].preview_url +
						" Album name: " + data.tracks.items[0].album.name + "~ ";
    	}
    	myAppend(tempInfo); //append to log file
	});
}
//--------------------------------------------------------------
// function to handle omdb
function myOmdb () {
	var tempInfo = ""; //reset variable for log file
	if (myRequest === "") { myRequest = "Mr Nobody"; } //search for Mr. Nobody is no title is entered
	var myArray = myRequest.split(" ");
	var mycomRequest = "";
	var myrotRequest = myArray[0];
	//format search request for api
	for (i = 0; i < myArray.length-1; i++) {
		mycomRequest = mycomRequest + myArray[i] + "+";
	}
	mycomRequest = mycomRequest + myArray[myArray.length-1];
	//format rotten tomatoes url
	if (myArray[0] == "the") {
		myrotRequest = "";
		for (i = 1; i < myArray.length-1; i++) {
			myrotRequest = myrotRequest + myArray[i] + "_";
		} 
		myrotRequest = myrotRequest + myArray[myArray.length-1];
	}else {
		myrotRequest = "";
		for (i = 0; i < myArray.length-1; i++) {
			myrotRequest = myrotRequest + myArray[i] + "_";
		}
		myrotRequest = myrotRequest + myArray[myArray.length-1];
	}
	
	request("https://www.omdbapi.com/?t=" + mycomRequest + "&plot=short&r=json", function (error, response, body) {
		//var omdb = JSON.stringify(body);
  		if (error) {
  			console.log('error:', error);// Print the error if one occurred 

  		} else { //format results
	  		console.log("==========================================");
  			console.log("");
  			console.log("Movie title: " + JSON.parse(body).Title);
	  		console.log("       Year: " + JSON.parse(body).Year); // Print the movie title. 
	  		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	  		console.log("    Country: " + JSON.parse(body).Country);
	  		console.log("   Language: " + JSON.parse(body).Language);
	  		console.log("       Plot: " + JSON.parse(body).Plot);
	  		console.log("     Actors: " + JSON.parse(body).Actors);
	  		console.log("    Website: " + JSON.parse(body).Website);
	  		console.log("");
	  		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	  		console.log("   Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + myrotRequest);
	  		console.log("");
	  		console.log("==========================================");
	  		tempInfo = 	"Movie title: " + JSON.parse(body).Title +
	  					" Year: " + JSON.parse(body).Year +
	  					" IMDB Rating: " + JSON.parse(body).imdbRating +
	  					" Country: " + JSON.parse(body).Country +
	  					" Language: " + JSON.parse(body).Language +
	  					" Plot: " + JSON.parse(body).Plot +
	  					" Actors: " + JSON.parse(body).Actors +
	  					" Website: " + JSON.parse(body).Website +
	  					" Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
	  					" Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + myrotRequest + "~ ";
  		}
  		myAppend(tempInfo); //append to log file
	});
}
//--------------------------------------------------------------
// function to handle do what it says
function dowhatitSays() {
	var myArr = [];
	fs.readFile('random.txt', 'utf8', (err, data) => {
  		if (err) throw err;
  		//console.log(data);
  		myArr = data.split(",");
  		initInput = myArr[0];
  		myRequest = myArr[1];
  		checkInput();
	});
}
