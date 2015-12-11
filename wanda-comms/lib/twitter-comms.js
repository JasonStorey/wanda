'use strict';

let EventEmitter = require('events');
let Twitter = require('twitter');
let CREDENTIALS = require('../credentials.json');

let client = new Twitter({
    consumer_key: CREDENTIALS.consumer_key,
    consumer_secret: CREDENTIALS.consumer_secret,
    access_token_key: CREDENTIALS.access_token_key,
    access_token_secret: CREDENTIALS.access_token_secret,
});

let emitter;

function init(config) {
    emitter = new EventEmitter();
    console.log('initialising twitter comms');
    console.log(config);
    client.stream('user', {}, function(stream) {
        stream.on('data', function(data) {
            if(isValidTweet(data)) {
                emitter.emit('question', getQuestion(data));
            } else {
                console.log(data);
            }
        });

        stream.on('error', function(error) {
            throw error;
        });
    });
}

function getQuestion(tweet) {
    return {
        text: tweet.text,
        asker: tweet.user.screen_name,
        statusId: tweet.id_str
    };
}

function respond(answer) {
    console.log(answer);

    client.post('media/upload', {media: answer.imageBuffer}, function(error, media, response) {
        if (error) {
            throw(error);
        }

        let status = {
            status: answer.text,
            in_reply_to_status_id: answer.question.statusId,
            media_ids: media.media_id_string
        };

        client.post('statuses/update', status,  function(error, tweet, resp){
            if(error) {
                throw error;
            }
        });
    });
}

function isValidTweet(data) {
    return data.created_at && data.user && data.user.id_str !== '4405045761';
}

module.exports = {
    init: init,
    getEmitter: () => emitter,
    respond: respond
};
