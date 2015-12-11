'use strict';

const WANDA_WATCHER_STILLS = 'http://localhost:3000/capture/';

let exec = require('child_process').exec;
let imageAnalysis = require('./image-analysis');

function init(config) {
    console.log(config);
    imageAnalysis.init();
    startCapturing();
}

function startCapturing() {
    grabImage(() => setTimeout(startCapturing, 100));
}

function grabImage(onSuccess) {
    //imagesnap -w 0.8 ./public/current.jpg
    exec('fswebcam -r 640x360 --no-banner ./public/stream.jpg', (error, stdout, stderr) => {
        if(error !== null) { console.log(error); return; }
        exec('cp ./public/stream.jpg ./public/current.jpg', (error, stdout, stderr) => {
            if(error !== null) { console.log(error); return; }
            onSuccess();
        });
    });
}

function getState(done) {
    let ts = Date.now(),
        wandaPicName = 'wanda_' + ts + '.jpg',
        wandaState = {
            positionId: -1,
            image: WANDA_WATCHER_STILLS + 'wanda.jpg',
            timestamp: ts
        };

    exec('cp ./public/current.jpg ./public/' + wandaPicName, (error, stdout, stderr) => {
        if(error !== null) {
            console.log(error);
            done(wandaState);
            return;
        }

        imageAnalysis.findWanda('./public/' + wandaPicName, position => {
            wandaState.positionId = position;
            wandaState.image = WANDA_WATCHER_STILLS + wandaPicName;
            done(wandaState);
        });
    });
}

module.exports = {
    init: init,
    getState: getState
};

