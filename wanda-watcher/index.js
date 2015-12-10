'use strict';

let express = require('express');
let app = express();
let wandaWatcher = require('./lib/wanda-watcher');

wandaWatcher.init('wanda watcher config');

app.get('/question', (req, res) => {
    res.json(getAnswer());
});

function getAnswer() {
    return wandaWatcher.getState();
}

app.listen(3000);

console.log('wanda watcher listening on 3000');
