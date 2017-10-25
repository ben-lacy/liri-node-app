var fs = require('fs');

function tweet(){
    var tw = require("./keys.js");
    var Twitter = require('twitter');
    var client = new Twitter({
        consumer_key: tw[0].consumer_key,
        consumer_secret: tw[0].consumer_secret,
        access_token_key: tw[0].access_token_key,
        access_token_secret: tw[0].access_token_secret
    });
    var params = {screen_name: 'bcampthrowaway'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var j = 0; j < tweets.length; j++) {
                console.log('I Tweeted: ' + tweets[j].text);
            }
        }
    });
}

function spot(x){
    var Spotify = require('node-spotify-api');
    var spotty = require("./keys.js");
    var spotify = new Spotify({
        id: spotty[1].id,
        secret: spotty[1].secret
    });
        
    spotify.search({ type: 'track', query: x, limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song Name: ' + data.tracks.items[0].name);
        console.log('Spotify Link: ' + data.tracks.items[0].preview_url);
        console.log('Album Name: ' + data.tracks.items[0].album.name);
    });
}

function movie (y){
    var request = require('request');
    var movieName = y;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var obj = JSON.parse(body);
            var tomato = '';
            for (var i = 0; i < obj.Ratings.length; i++) {
                if (obj.Ratings[i].Source === 'Rotten Tomatoes'){
                    tomato = obj.Ratings[i].Value;
                }
            }
            console.log("Title: " + obj.Title);
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

if (command === 'my-tweets') {
    tweet();
} else if (command === 'spotify-this-song') {
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
} else if (command === 'movie-this') {
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
} else if (command === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) { return console.log(error); }
        var dataArr = data.split(",");
        spot(dataArr[1]);
    });
} else {
    console.log('Invalid command. Please try again');
}