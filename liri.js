var fs = require('fs');                                                                 // So you can read/write/append

function tweet(){
    var tw = require("./keys.js");                                                      // Grab twitter API keys
    var Twitter = require('twitter');                                                       // Require Twitter module
    var client = new Twitter({                                                          // Assign those keys locally
        consumer_key: tw[0].consumer_key,
        consumer_secret: tw[0].consumer_secret,
        access_token_key: tw[0].access_token_key,
        access_token_secret: tw[0].access_token_secret
    });
    var params = {screen_name: 'bcampthrowaway'};                                       // Give it my username
    client.get('statuses/user_timeline', params, function(error, tweets, response) {    // Get the data from Twitter
        if (!error) {
            for (var j = 0; j < tweets.length; j++) {                                   // Loop through the tweets and log them
                console.log('I Tweeted: ' + tweets[j].text);
            }
        }
    });
}

function spot(x){
    var Spotify = require('node-spotify-api');
    var spotty = require("./keys.js");                                                      // Grab API keys
    var spotify = new Spotify({
        id: spotty[1].id,
        secret: spotty[1].secret
    });
        
    spotify.search({ type: 'track', query: x, limit: 5 }, function(err, data) {             // Perform the song search
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);                     // Log the resulting info
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('Spotify Link: ' + data.tracks.items[0].preview_url);
        console.log('Album Name: ' + data.tracks.items[0].album.name);
    });
}

function movie (y){
    var request = require('request');                                                       // Require Request module
    var movieName = y;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var obj = JSON.parse(body);                                             // Get the JSON obj into a simple var
            var tomato = '';                                                        // Do a bunch of extra work because the API
            for (var i = 0; i < obj.Ratings.length; i++) {                              // buried the Rotten Tomatoes rating
                if (obj.Ratings[i].Source === 'Rotten Tomatoes'){                       // in an array of ratings objects
                    tomato = obj.Ratings[i].Value;
                }
            }
            console.log("Title: " + obj.Title);                                     // Log the movie's information
            console.log("Release Year: " + obj.Year);
            console.log("IMDB Rating: " + obj.imdbRating);
            console.log("Rotten Tomatoes Rating: " + tomato);
            console.log("Country Produced: " + obj.Country);
            console.log("Language: " + obj.Language);
            console.log("Plot: " + obj.Plot);
            console.log("Actors: " + obj.Actors);
        }
    });
}

var nodeArgs = process.argv;
var command = process.argv[2];

if (command === 'my-tweets') {                                  // If they want tweets
    tweet();
} else if (command === 'spotify-this-song') {                   // If they chose spotify
    if (process.argv[3]){
        var input2 = nodeArgs[3];
        if (nodeArgs[4]){
            for (var i = 4; i < nodeArgs.length; i++) {
                input2 = input2 + " " + nodeArgs[i];
            }
        }
        spot(input2);
    } else {
        spot('"The Sign" by Ace of Base');
    }
} else if (command === 'movie-this') {                          // If they chose the movie command
    if (process.argv[3]){
        var input = nodeArgs[3];
        if (nodeArgs[4]){
            for (var i = 4; i < nodeArgs.length; i++) {
                input = input + "+" + nodeArgs[i];
            }
        }
        movie(input);
    } else {
        movie('Mr.+Nobody');
    }
} else if (command === 'do-what-it-says') {                     // If they do what it says
    fs.readFile("random.txt", "utf8", function(error, data) {       // Grab info from random.txt and...
        if (error) { return console.log(error); }
        var dataArr = data.split(",");
        spot(dataArr[1]);                                           // Send it to spotify
    });
} else {
    console.log('Invalid command. Please try again');           // No valid command received
}