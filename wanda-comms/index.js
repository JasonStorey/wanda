'use strict';

const WANDA_WATCHER_URL = 'http://localhost:3000/question';

let request = require('request');
let twitterComms = require('./lib/twitter-comms');
let messages = require('./lib/messages');

twitterComms.init('A dummy Twitter config');
twitterComms.getEmitter().on('question', question => {
    console.log(question);
    getResponse(question, twitterComms.respond);
});

function getResponse(question, done) {
    request({url: WANDA_WATCHER_URL, json: true}, (error, response, body) => {
        request.get({url: body.image, encoding: null}, (error, response, imageBody) => {
            if (!error && response.statusCode == 200) {
                done({
                    text: messages.getMessage(body.positionId, '@' + question.asker),
                    imageBuffer: imageBody,
                    question: question
                });
            }
        });
    });
}

console.log('wanda comms initialised');
