# liri-node-app
Language Interpetation and Recognition Interface (liri)

This Node.js app is designed to run in Terminal on the mac or Bash on the pc.  It takes in command line arguments and performs 4 specific functions based on the arguments requested.

The four functions are:

	my-tweets
	spotify-this-song
	movie-this
	do-what-it-says

The program will also recognize the command help.  If no arguments are entered, it will display the four functions listed above plus help. The help command shows the format for the requests.  A help command should be submitted:

	node liri help

my-tweets will pull my last 20 tweets from Twitter, although the code can be easily modified to search for topics.  To run the function enter the following from the command line:

	node liri my-tweets

spotify-this-song will search the spotify api for information matching the user request.  The request may be song or song and artist as long as quotes are used to delimit the parameters.  The program will display the following information to the console after a successful search:

	artist
	song title
	preview link
	album name

The request should be in this format:
	
	node liri spotify-this-song "your song search title here"

movie-this will search the OMDB api for movie information and the program will return the following information to the console after a successful search:

	movie 	title
		year
		IMDB rating
		country
		language
		plot
		actors
		website
		rotten tomatoes rating
		rotten tomatoes url

Movie titles with more than one word must be delimited by quotations.  Requests for this function should be in the following format:

	node liri movie-this "movie title here"

do-what-it-says opens the random.txt file and tries to execute the text stored there.  This feature was put in for testing and will only execute the first command it encounters. The random.txt file needs to have 2 items seperated by a comma; one of the 4 functions and if necessary, a search parameter. (Although it will execute the command help)
Below is an example of how the file contents should look:

	movie-this,"the princess bride"

the do-what-it-says command should be entered:

	node liri do-what-it-says
	

