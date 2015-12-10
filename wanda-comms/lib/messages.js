const MESSAGES = {
    NEGATIVE: ['I don\'t think so, %%USER%%. It doesn\'t seem sensible to me.'],
    AFFIRMATIVE: ['Definitely, %%USER%%. I am only a goldfish though.'],
    MAYBE: ['Hmmm... %%USER%%. I really couldn\'t say. Perhaps try giving up instead.']
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
