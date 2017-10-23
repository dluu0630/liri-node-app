# liri-node-app

Used Node.js to create Liri bot that takes in command line parameters and give back data.

Need to install:
* Twitter NPM Package - https://www.npmjs.com/package/twitter
* Spotify NPM Package - https://www.npmjs.com/package/spotify
* Request NPM Package - https://www.npmjs.com/package/request

1. Node liri.js my-tweets
* Displays last 20 tweets and when they were created.

2. node liri.js spotify-this-song <song name>
* Shows information about song name which includes:
 artist, track name, album, and preview link to song.

3. node liri.js movie-this <movie name>
* Shows informaton about movie which includes:
title, year of release, IMDB rating, country of origin, language, plot, actors, Rotten Tomatoes rating and url

4. node liri.js do-what-it-says
* Takes text from random.txt and runs through spotify-this-song