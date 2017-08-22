var fs = require("fs"); 
var request = require("request");
var keys = require("./keys.js");
var liriArguments = process.argv[2];
var twitter = require("twitter");

switch(liriArguments) {
    case "my-tweets":
    myTweets();
    break;
    case "spotify-this-song":
    spotifyThisSong();
    break;
};

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
    client.get('statuses/user_timeline', params, function(error, timeline, response){
		if(!error){
			for(tweet in timeline){
				//this creates the variable tdate which will store the result of the date from the twitter call for easier access later
				var tDate = new Date(timeline[tweet].created_at);

				//console.log all of the tweets organizing them by tweet# followed by the date of the tweet and finally the text of the tweet itself
				console.log("Tweet #: " + (parseInt(tweet)+1) + " ");
				console.log(tDate.toString().slice(0, 24) + " ");
				console.log(timeline[tweet].text);
				console.log("\n");

				//append all of this information to the txt file 
				fs.appendFile('log.txt', "Tweet #: " + (parseInt(tweet)+1) + "\n");
				fs.appendFile('log.txt', timeline[tweet].text + "\n");
				fs.appendFile('log.txt', "\n");

			}
		} 
	});
}