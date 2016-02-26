var express = require('express'),
    server = express(),
    vhost = require('vhost'),
    config = require('./config.js');

server.use(vhost('mates-checker.'+config.env.dns, require('./mates-checker/index')));

server.get('/', function(req, res) {

    var script = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:300px;height:600px" data-ad-client="ca-pub-5466650298483971" data-ad-slot="7564072442"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

    res.end('<html><body><p>More tools incoming</p>' + script + '</body></html>');
});

module.exports = server;