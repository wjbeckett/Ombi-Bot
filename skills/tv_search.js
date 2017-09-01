/*

WHAT IS THIS?

This module uses the BotKit hears function to search theTVdb for a movie and return the results.

Botkit is configured to listen for certain phrases, and then
performs a search based on the users input.

*/

const TVDB = require('node-tvdb');
const tvdb = new TVDB(process.env.TVDB_API_KEY);
module.exports = function(controller) {
  
controller.hears(['request tv show\ (.+?)$'], 'direct_message,direct_mention', function(bot, message) {
    
    var tvshow = message.match[1];
    //var person = trigger.user.id; //need to define trigger by changing this thread to an interactive message
  
    tvdb.getSeriesByName(tvshow)
      .then(shows => { 
      console.log(shows); 
        
        bot.reply(message, 'Heres what I found for ' + tvshow + '...');
      
        for(var element in shows){              
          var shows_with_attachments = {
          //'username': 'Ombi',
          'attachments': [
            {
              //'author_name': 'TVDB ID: ' + `${shows[element].id}`,
              //'author_link': 'http://thetvdb.com/index.php?tab=series&id=' + `${shows[element].id}`,
              //'author_icon': 'http://i.imgur.com/vJFzNCm.png',
              'title': `${shows[element].seriesName}`,
              'title_link': 'http://thetvdb.com/index.php?tab=series&id=' + `${shows[element].id}`,
              'text': `${shows[element].overview}`,
              "fields": [
                {
                    "title": "Status",
                    "value": `${shows[element].status}`,
                    "short": false
                }
              ],
              'image_url': 'http://thetvdb.com/banners/posters/' + `${shows[element].id}` + '-1.jpg',
              'thumb_url': 'http://thetvdb.com/banners/' + `${shows[element].banner}`,
              'footer': 'TVDB ID: ' + `${shows[element].id}`,
              'footer_icon': 'http://i.imgur.com/vJFzNCm.png',
              'color': '#F88017',
              'callback_id': shows[element].id, // + person
              actions: [
                {
                  'name': 'request_show',
                  'text': 'Request It!',
                  'value': 'request_show',
                  'style': 'primary',
                  'type' : 'button',
                  }
                ]
              },
            ]
          };
            bot.reply(message, shows_with_attachments);
        }                  
                     
            })
      .catch(error => 
             { console.log(error); 
            bot.reply(message, `I couldn't find any TV Shows matching "${tvshow}"`);
             
             });
});
  
  
// Button actions
controller.on('interactive_message_callback', function(bot, trigger) {


        if (trigger.actions[0].name.match(/^request_show/)) {

            var message = {
                user: trigger.user,
                channel: trigger.channel,
                text: '<@' + bot.identity.id + '> ' + trigger.actions[0].value,
                type: 'message',
            };

            var reply = trigger.original_message;

            for (var a = 0; a < reply.attachments.length; a++) {
                reply.attachments[a].actions = null;
            }

            var person = '<@' + trigger.user.id + '>';
            if (message.channel[0] == 'D') {
                person = 'You';
            }

            reply.attachments.push(
                {
                    title: 'Requested!',
                    text: 'You can check the status in Ombi',
                    color: '#7CD197'
                  
                }
            );

            bot.replyInteractive(trigger, reply);

            controller.receiveMessage(bot, message);
            console.log(message);
            return false; // do not bubble event
        }

    });  
  
                   
};         