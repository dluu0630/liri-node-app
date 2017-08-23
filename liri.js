var fs = require("fs"); 
var request = require("request");
var liriArguments = process.argv[2];

//Switch Cases
switch(liriArguments) {
    case "my-tweets":
    myTweets();
    break;
    case "spotify-this-song":
    spotifyThisSong();
    break;
}

// Twitter function
function myTweets() {
	// data from keys.js
	var keys = require("./keys.js");
	var twitter = require("twitter");
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
		}
		else {
		  for(i=0 ; i < tweets.length ; i++){
			console.log((i+1) + ". " + tweets[i].created_at + ": " + tweets[i].text);
		  }
		}
	  });
    
}