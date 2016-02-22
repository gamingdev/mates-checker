var express = require('express'),
    server = express(),
    vhost = require('vhost');

server.use(vhost('mates-checker.localhost', require('./mates-checker/index')));

server.get('/', function(req, res) {

    res.end('<html><body>More tools incoming</body></html>');
});

module.exports = server;