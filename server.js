var express = require('express'),
    app = express(),
    vhost = require('vhost'),
    path = require('path'),
    config = require('./config.js');

app.use(vhost('mates-checker.'+config.env.dns, require('./mates-checker/index')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {

    res.render('welcome');
});

module.exports = app;