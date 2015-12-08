'use strict'

function init(config) {
    console.log(config);
}

function getState() {
    return {
        positionId: 0,
        image: 'wanda pic',
        timestamp: Date.now()
    };
}

module.exports = {
    init: init,
    getState: getState
};

