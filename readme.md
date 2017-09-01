# Ombi bot for Slack!

[![Build Status](https://travis-ci.org/wjbeckett/Ombi-bot.svg?branch=master)](https://travis-ci.org/wjbeckett/Ombi-bot)


This repo contains everything you need to run a Slack bot with [Botkit](https://botkit.ai) which integrates with Ombi.

Our goal with this bot is to make interfacing with Ombi easier and all from one console!

#### Install this bot

Clone this repository:
`git clone https://github.com/wjbeckett/ombi-bot.git`

Install the botkit framework and dependencies:
```
cd ombi-bot
npm install
```

Install Required modules (You will need your own api keys for both TMDB and TVDB).
```
npm install --save moviedb
npm install --save node-tvdb
```

Create a .env file in the ombi-bot directory to store your api and client keys. The file should look like the below (you will get your slack client and client secret keys below).
```
clientId=(Slack Client ID)
clientSecret= (Slack Client Secret)
PORT=(bot port - default is 3000)
DASHBOT_API_KEY=(if you want to use dashbot)
TMDB_API_KEY=(TMDB key)
TVDB_API_KEY=(TVDB key)
```

#### Set up your Slack Application
Once you have setup your Botkit development enviroment, the next thing you will want to do is set up a new Slack application via the [Slack developer portal](https://api.slack.com/). This is a multi-step process, but only takes a few minutes.

* [Read this step-by-step guide](https://github.com/howdyai/botkit/blob/master/docs/slack-events-api.md) to make sure everything is set up.

Update the `.env` file with your newly acquired tokens.

Launch your bot by typing:
`node .`

Now, visit your new bot's login page: http://bot-url/login

#### Additional steps
You will need to reverse proxy your bot with nginx or apache or something similar along with an ssl cert like letsencrypt as Slack requires ssl connections for bots.

The gist will be: Bot external url on https(443) which is then reverse proxied to the internal port ofnthe bot (3000). There are numerous guides aound the place on setting up a reverse proxy with letsencrypt so im not going to cover that here.

#### Usage
Once the bot is in your slack team you can either direct messge the bot or invite it to a channel and mention it to initiate searches

##### To search for a movie:
`@ombi request movie Shrek the Third`
This command will search TMDB.org for any movies relating to "Shrek the Third" and return their results as pre formatted messages
<br />
<br />
![Movie Search](https://raw.githubusercontent.com/wjbeckett/Ombi-bot/master/github_img/movie_search.png)

##### To search for a TV Show:
`@ombi request tv show Suits`
Much the same as the mvoie search this will return results from theTVDB.com relating to the search term "Suits"
<br />
<br />
![TV Search](https://raw.githubusercontent.com/wjbeckett/Ombi-bot/master/github_img/tv_search.png)
