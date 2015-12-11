'use strict';

let getPixels = require('get-pixels');
let calibratedPixels;

function init() {
    calibrate();
}

function findWanda(imagePath, done) {
    let fishPosish = -1;

    getPixels(imagePath, function(err, pixels) {
        if(err) {
            console.log('Bad image path');
            return
        }

        let leftPixels = getPixelsFromQuadrant(0, pixels),
            rightPixels = getPixelsFromQuadrant(1, pixels);

        let leftDelta = calculateImageDelta(getPixelsFromQuadrant(0, calibratedPixels), leftPixels),
            rigthDelta = calculateImageDelta(getPixelsFromQuadrant(1, calibratedPixels), rightPixels);

        fishPosish = leftDelta > rigthDelta ? 0 : 1;

        done(fishPosish);
    });
}

function calculateImageDelta(oldImagePixels, newImagePixels) {
    let delta = 0,
        red = newImagePixels.pick(null, null, 0),
        oldRed = oldImagePixels.pick(null, null, 0);

    for(var i = 0; i < red.shape[0]; ++i) {
        if(i % 5 === 0) {
            for(var j = 0; j < red.shape[1]; ++j) {
                if (j % 50 === 0) {
                    let diff = Math.abs(oldRed.get(i, j) - red.get(i, j));
                    delta += diff > 5 ? diff : 0;
                }
            }
        }
    }

    return delta;
}

function calibrate() {
    getPixels('./public/calibrate.jpg', (err, pixels) => {
        if (err) {
            console.log('Bad image path');
            return;
        }

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
