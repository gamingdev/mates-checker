var express = require('express'),
    server = express(),
    vhost = require('vhost'),
    config = require('./config.js');

server.use(vhost('mates-checker.'+config.env.dns, require('./mates-checker/index')));

server.get('/', function(req, res) {

    res.end('<html><body>More tools incoming</body></html>');
});

module.exports = server;