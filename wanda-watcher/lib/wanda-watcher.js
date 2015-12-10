'use strict';

let exec = require('child_process').exec;

function init(config) {
    console.log(config);
    startCapturing();
}

function startCapturing() {
    grabImage(() => setTimeout(startCapturing, 1000));
}

function grabImage(onSuccess) {
    exec('imagesnap -w 1 ./images/capture.png', (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        if(error !== null) {
            return;
        }
        onSuccess();
    });
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

