const MESSAGES = {
    NEGATIVE: [
        'I don\'t think so, %%USER%%. It doesn\'t seem likely to me.',
        '%%USER%% Nope. Just nope.',
        '%%USER%% I wouldn\'t count on it.',
        '%%USER%% Well, you\'d be lucky...',
        '%%USER%% It pains me to say it, but it\'s a clear no.',
        'Look, %%USER%%, the answer is no.',
        '%%USER%% Highly doubtful.',
        'If that\'s true, %%USER%%, I\'ll eat my tiny fish hat.',
        '%%USER%% Pah! Not a chance, buddy.',
        'Well that\'s so obviously false, %%USER%%',
        '%%USER%% Outlook is bleak.'
    ],
    AFFIRMATIVE: [
        'Definitely, %%USER%%. I am only a goldfish though.',
        '%%USER%% Yes. I think so.',
        'Sure, %%USER%%. You can count on it.',
        'It\'s a yes, %%USER%%. Always has been.',
        'Affirmative, %%USER%%',
        'What\'s with all these questions, %%USER%%? Yes. Of course.',
        '%%USER%% I don\'t know how you could think anything different',
        '%%USER%% Naturally.',
        'Indeed, %%USER%%. I think it\'s obvious.'
    ],
    MAYBE: [
        'Hmmm... %%USER%%. I really couldn\'t say. Perhaps try giving up.',
        'I don\'t know, %%USER%%. Am I a little robot fish?',
        'Not sure, %%USER%%. I can\'t even remember what I had for breakfast.',
        'Dunno, %%USER%%. I\'m only supposed to have a 3 second memory.',
        'Couldn\'t really say, %%USER%%. Have you tried Google?'
    ]
};

function getMessage(position, name) {
    switch(position) {
        case 0:
            return interpolateString(getRandomFromArray(MESSAGES.NEGATIVE), name);
            break;
        case 1:
            return interpolateString(getRandomFromArray(MESSAGES.AFFIRMATIVE), name);
            break;
        default:
            return interpolateString(getRandomFromArray(MESSAGES.MAYBE), name);
    }
}

function interpolateString(string, name) {
    return string.replace('%%USER%%', name);
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
    getMessage: getMessage
};
