'use strict';

let getPixels = require('get-pixels');
let imageDeltaThreshold = 2000;
let calibratedPixels;

function init() {
    calibrate();
}

function findWanda(imagePath, done) {
    let fishPosish = -1;
    console.log('finding wanda in : ' + imagePath);

    getPixels(imagePath, function(error, pixels) {
        if(error) { console.log(error); return; }

        let leftPixels = getPixelsFromQuadrant(0, pixels),
            rightPixels = getPixelsFromQuadrant(1, pixels);

        let leftDelta = calculateImageDelta(getPixelsFromQuadrant(0, calibratedPixels), leftPixels),
            rightDelta = calculateImageDelta(getPixelsFromQuadrant(1, calibratedPixels), rightPixels);

        if(Math.max(leftDelta, rightDelta) > imageDeltaThreshold) {
            fishPosish = leftDelta > rightDelta ? 0 : 1;
        }

        console.log(leftDelta, rightDelta, fishPosish);

        done(fishPosish);
    });
}

function calculateImageDelta(oldImagePixels, newImagePixels) {
    let delta = 0,
        newRed = newImagePixels.pick(null, null, 0),
        oldRed = oldImagePixels.pick(null, null, 0);

    for(var i = 0; i < newRed.shape[0]; ++i) {
        if(i % 5 === 0) {
            for(var j = 0; j < newRed.shape[1]; ++j) {
                if (j % 5 === 0) {
                    let diff = Math.abs(oldRed.get(i, j) - newRed.get(i, j));
                    delta += diff > 40 ? diff : 0;
                }
            }
        }
    }

    return delta;
}

function calibrate() {
    getPixels('./public/calibrate.jpg', (error, pixels) => {
        if(error) { console.log(error); return; }
        console.log('calibrated');
        calibratedPixels = pixels;
    });
}

function getPixelsFromQuadrant(quadrantIndex, pixels) {
    switch(quadrantIndex) {
        case 0:
            return pixels.hi(pixels.shape[0] / 2, pixels.shape[1], 1);
            break;

        case 1:
            return pixels.lo(pixels.shape[0] / 2, 0, 1).hi(pixels.shape[0] / 2, pixels.shape[1], 1);
            break;

        default:
            return pixels.hi(pixels.shape[0] / 2, pixels.shape[1], 1);
    }
}

module.exports = {
    init: init,
    findWanda: findWanda
};
