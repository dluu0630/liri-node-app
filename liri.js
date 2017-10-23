var fs = require("fs");
var request = require("request");
// data from keys.js
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var liriArguments = process.argv[2];
var actionArguments = process.argv[3];

//Switch Cases
switch (liriArguments) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifySong(actionArguments);
        break;
    case "movie-this":
        movieThis(actionArguments);
        break;
    case "do-what-it-says":
        doWhat();
        break;

}

// Twitter function
function myTweets() {
    var client = new twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });

    var params = {
        screen_name: 'dluu0630',
        count: '20',
        trim_user: false,
    }
    // Gets search info. If error detected prints it else runs through for loop and prints tweets.
    client.get('statuses/user_timeline', params, function(error, tweets) {
        if (error) {
            console.log(error);
        } else {
            for (i = 0; i < tweets.length; i++) {
                console.log((i + 1) + ". " + tweets[i].created_at + ": " + tweets[i].text);
            }
        }
    });

}

// Spotify function
function spotifySong(trackName) {
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });
    // if trackname not defined, default to Ace of Base The Sign
    var trackName = process.argv[3];
    if (!trackName) {
        trackName = "Ace of Base The Sign";
    }
    // search track details and prints details
    spotify.search({ type: "track", query: trackName }, function(err, data) {
        if (!err) {
            var trackDetails = data.tracks.items;
            for (var i = 0; i < 1; i++) {
                if (trackDetails[i] != undefined) {
                    var spotifySearch =
                        "Musician: " + trackDetails[i].artists[0].name + "\r\n" + "Track: " + trackDetails[i].name + "\r\n" + "Album: " + trackDetails[i].album.name + "\r\n" + "Preview: " + trackDetails[i].preview_url;
                    console.log(spotifySearch);
                }
            }
        } else {
            console.log("Error :" + err);
            return;
        }
    });
};

// Movie This function
function movieThis() {
    var movieName = process.argv[3];
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

    request(queryURL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            //prints movie details
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);

        } else {
            console.log('Error occurred.');
            if (movieName === undefined) {
                movieName === "Mr. Nobody";
            };
            console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");



        }
    });

}

// Do What It Says Function
function doWhat() {
    // reads  random.txt and do executes whats within file
    fs.readFile("random.txt", 'utf8', function(err, data) {
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (!error) {
                    doWhatResults = data.split(",");
                    spotifySong(doWhatResults[0], doWhatResults[1]);
                } else {
                    console.log("Error occurred" + error);
                }
            });
        },
        // reads and writes from log.txt then prints to to terminal 
        function log(logResults) {
            fs.appendFile("log.txt", logResults, (error) => {
                if (error) {
                    throw error;
                }
            })
        })
}