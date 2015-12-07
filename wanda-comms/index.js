'use strict'
let twitterComms = require('./lib/twitter-comms');

twitterComms.init('A dummy Twitter config');
twitterComms.getEmitter().on('question', question => {
    twitterComms.respond(getResponse(question));
});

function getResponse(question) {
    return {
        text: 'No, @' + question.asker + ', that is a terrible idea.',
        image: 'some image'
    };
}

console.log('wanda comms initialised');

