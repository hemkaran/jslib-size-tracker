/**
 * Created by hemkaran on 12/07/16.
 */
var express = require('express');
var app = express();
var release = require('./release');

app.get('/', function (req, res) {
    res.send('Server is running');
});

app.get('/size', function (req, res) {
    release();
    res.send('Mail sent successfully!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
