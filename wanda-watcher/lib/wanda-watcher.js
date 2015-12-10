'use strict';

let exec = require('child_process').exec;

function init(config) {
    console.log(config);
    startCapturing();
}

function startCapturing() {
    grabImage(() => setTimeout(startCapturing, 50));
}

function grabImage(onSuccess) {
    exec('imagesnap -w 0.8 ./public/current.jpg', (error, stdout, stderr) => {
        console.log(error, stdout, stderr);
        if(error !== null) { return; }
        onSuccess();
    });
}

function getState(done) {
    let ts = Date.now(),
        wandaPicName = 'wanda_' + ts + '.jpg',
        wandaState = {
            positionId: 0,
            image: '/capture/' + wandaPicName,
            timestamp: ts
        };

    exec('cp ./public/current.jpg ./public/' + wandaPicName, (error, stdout, stderr) => {
        if(error !== null) {
            wandaState.image = '/capture/wanda.jpg';
        }
        done(wandaState);
    });
}

module.exports = {
    init: init,
    getState: getState
};

