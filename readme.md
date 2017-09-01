# Ombi bot for Slack!

[![Build Status](https://travis-ci.org/wjbeckett/Ombi-bot.svg?branch=master)](https://travis-ci.org/wjbeckett/Ombi-bot)


This repo contains everything you need to run a Slack bot with [Botkit](https://botkit.ai) which integrates with Ombi.

Our goal with this bot is to make interfacing with Ombi easier and all from one console!

#### Install this bot

Clone this repository using Git:

`git clone https://github.com/wjbeckett/ombi-bot.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd botkit-starter-slack
npm install
```

#### Set up your Slack Application 
Once you have setup your Botkit development enviroment, the next thing you will want to do is set up a new Slack application via the [Slack developer portal](https://api.slack.com/). This is a multi-step process, but only takes a few minutes. 

* [Read this step-by-step guide](https://github.com/howdyai/botkit/blob/master/docs/slack-events-api.md) to make sure everything is set up. 

* We also have this [handy video walkthrough](https://youtu.be/us2zdf0vRz0) for setting up this project with Glitch.

Next, get a Botkit Studio token [from your Botkit developer account](https://studio.botkit.ai/) if you have decided to use Studio. 

Update the `.env` file with your newly acquired tokens.

Launch your bot application by typing:

`node .`

Now, visit your new bot's login page: http://localhost:3000/login
