'use strict'

let EventEmitter = require('events');
let Twitter = require('Twitter');
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
            console.log(data);
            if(isTweet(data)) {
                emitter.emit('question', getQuestion(data));
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
        asker: tweet.user.screen_name
    };
}

function respond(response) {
    console.log(response);
}

function isTweet(data) {
    return data.created_at && data.user;
}

module.exports = {
    init: init,
    getEmitter: () => emitter,
    respond: respond
};

