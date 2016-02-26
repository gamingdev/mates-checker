var express = require('express'),
    server = express(),
    vhost = require('vhost'),
    config = require('./config.js');

server.use(vhost('mates-checker.'+config.env.dns, require('./mates-checker/index')));

server.get('/', function(req, res) {

    var ads = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:300px;height:600px" data-ad-client="ca-pub-5466650298483971" data-ad-slot="7564072442"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

    var analytics = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject'] = r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-74259402-1', 'auto');ga('send', 'pageview');</script>"

    res.end('<html><body><p>More tools incoming</p>' + ads + analytics + '</body></html>');
});

module.exports = server;