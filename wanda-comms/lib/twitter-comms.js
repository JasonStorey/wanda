'use strict'

let Twitter = require('Twitter');
let CREDENTIALS = require('../credentials.json');

let client = new Twitter({
    consumer_key: CREDENTIALS.consumer_key,
    consumer_secret: CREDENTIALS.consumer_secret,
    access_token_key: CREDENTIALS.access_token_key,
    access_token_secret: CREDENTIALS.access_token_secret,
});

function init(config) {
    console.log('initialising twitter comms');
    console.log(config);
    client.stream('user', {}, function(stream) {
        stream.on('data', function(tweet) {
            console.log(tweet);
        });
        stream.on('error', function(error) {
            throw error;
        });
    });
}

module.exports = {
    init: init
};

