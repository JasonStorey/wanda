'use strict';

let exec = require('child_process').exec;
let imageAnalysis = require('./image-analysis');

function init(config) {
    console.log(config);
    imageAnalysis.init();
    startCapturing();
}

function startCapturing() {
    grabImage(() => setTimeout(startCapturing, 50));
}

function grabImage(onSuccess) {
    exec('imagesnap -w 0.8 ./public/current.jpg', (error, stdout, stderr) => {
        if(error !== null) { return; }
        onSuccess();
    });
}

function getState(done) {
    let ts = Date.now(),
        wandaPicName = 'wanda_' + ts + '.jpg',
        wandaState = {
            positionId: -1,
            image: '/capture/wanda.jpg',
            timestamp: ts
        };

    exec('cp ./public/current.jpg ./public/' + wandaPicName, (error, stdout, stderr) => {
        if(error !== null) {
            done(wandaState);
            return;
        }

        imageAnalysis.findWanda('./public/' + wandaPicName, position => {
            wandaState.positionId = position;
            wandaState.image = '/capture/' + wandaPicName;
            done(wandaState);
        });
    });
}

module.exports = {
    init: init,
    getState: getState
};

