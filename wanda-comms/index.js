'use strict'
let twitterComms = require('./lib/twitter-comms');

twitterComms.init('A dummy Twitter config');
twitterComms.getEmitter().on('question', question => {
    console.log(question);
    twitterComms.respond(getResponse(question));
});

function getResponse(question) {
    return {
        text: 'No, @' + question.asker + ', that is a terrible idea.',
        image: 'some image',
        question: question
    };
}

console.log('wanda comms initialised');

