var express = require('express')
var app = express();
var hostname = 'localhost'
var authenticator = require('./authenticator')
var url = require('url')
var config = require('./config')
var Twitter = require('twitter')

var client = new Twitter({
consumer_key: config.consumer_key,
consumer_secret: config.consumer_secret,
access_token_key: config.access_token_key,
access_token_secret: config.access_token_secret
})

app.set('view engine', 'ejs');
app.use(require('cookie-parser')());

app.get('/', function(req, res, next){
  client.get('users/show', { screen_name: 'Beef_B0T', count: 20 }, function(error, user, response) {
    if (!error) {
      if (req.param('oauth_token') === undefined) {
        res.status(200).render('index', { title: 'Please Sign in'})
      }
      else{
      res.status(200).render('index1', { title: 'Twitter Account', user: user })
      }
    }
    else {
      res.status(500).json({ error: error })
    }
})
})
app.get('/auth/twitter', authenticator.redirectToTwitterLogin);


app.get(url.parse(config.oauth_callback).path, function(req, res){
  authenticator.authenticate(req, res, function(err){
    if (err) {
      console.log(err)
      // res.sendStatus(401);
    }
    else{

    }
  })
})


app.listen(config.port, function() {
console.log(`Server running on ${hostname}:${config.port}`);
})
