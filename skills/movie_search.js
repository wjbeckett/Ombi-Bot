/*

WHAT IS THIS?

This module uses the BotKit hears function to search TMDb for a movie and return the results.

Botkit is configured to listen for certain phrases, and then
performs a search based on the users input.

*/


const tmdb = require('moviedb')(process.env.TMDB_API_KEY);
module.exports = function(controller) {

  controller.hears(['request movie\ (.+?)$'], 'direct_message,direct_mention', function(bot, message) {

    var movie = message.match[1];
    //var person = trigger.user.id; //need to define trigger by changing this thread to an interactive message

    bot.reply(message, 'Heres what I found for ' + movie + '...');

    tmdb.searchMovie({ query: movie}, (err, movies) => {
    console.log(movies);
      if(err) {
        bot.reply(message, `Sorry, an error occurred searching for "${movie}"`);
        return;
      }

      if(movies.total_results == 0) {
        bot.reply(message, `I couldn't find any movies matching "${movie}"`);
        return;
      }
      
      //if(movies.total_results > 6) {
      //  bot.reply(message, `I found too many results, please refine your search`);
      //  return;
      //}

      for(var element in movies.results){
        var release_date = movies.results[element].release_date
        var release_year = release_date.replace(/-.+-.+/g, "")
        var reply_with_attachments = {
          //'username': 'Ombi',
          'attachments': [
            {
              'author_name': 'TMDB ID: ' + `${movies.results[element].id}`,
              'author_link': 'https://themoviedb.org/movie/' + `${movies.results[element].id}`,
              'author_icon': 'https://pbs.twimg.com/profile_images/789117657714831361/zGfknUu8.jpg',
              'title': `${movies.results[element].title} (${release_year})`,
              'text': `${movies.results[element].overview}`,
              //'image_url': 'https://image.tmdb.org/t/p/original' + `${movies.results[element].poster_path}`,
              'thumb_url': 'https://image.tmdb.org/t/p/original' + `${movies.results[element].poster_path}`,
              'color': '#7CD197',
              'callback_id': movies.results[element].id, // + person
              actions: [
                {
                  'name': 'request',
                  'text': 'Request!',
                  'value': 'request',
                  'style': 'primary',
                  'type' : 'button',
                }
              ]
            },
          ]
        };

        bot.reply(message, reply_with_attachments);
      }

    })

  });

};

