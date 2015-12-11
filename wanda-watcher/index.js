'use strict';

let express = require('express');
let app = express();
let wandaWatcher = require('./lib/wanda-watcher');

wandaWatcher.init('wanda watcher config');

app.use('/capture', express.static('public'));

app.get('/question', (req, res) => {
    getAnswer(answer => {
        console.log(answer);
        res.json(answer);
    });
});

function getAnswer(done) {
    wandaWatcher.getState(done);
}

app.listen(3000);

console.log('wanda watcher listening on 3000');
