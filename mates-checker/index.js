var express = require('express'),
    app = express(),
    path = require('path'),
    vhost = require('vhost'),
    _ = require('underscore'),
    bodyParser = require('body-parser'),
    nodemailer = require('nodemailer'),
    config = require('../config.js'),
    i18n = require('i18n');

var transporter = nodemailer.createTransport(config.smtp);
i18n.configure({
    locales: ['en', 'fr'],
    directory: __dirname + "/locales"
});


app.use(i18n.init);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    var reg = _.isUndefined(req.query.region) ? 'euw' :req.query.region;

    res.render('index', {region: reg});
})

    .post('/sendMessage', function(req, res) {
        if (!_.isEmpty(req.body)) {
            // add message to the mail
            mailOptions = _.extend(config.mailOptions, {text: req.body.corp});

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
        }

        res.send({ok: true});
    })
;

module.exports = app;