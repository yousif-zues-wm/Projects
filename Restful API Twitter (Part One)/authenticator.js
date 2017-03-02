var Oauth = require('oauth').OAuth;
var config = require('./config')
var oauth = new Oauth(
  config.request_token_url,
  config.access_token_url,
  config.consumer_key,
  config.consumer_secret,
  config.oauth_version,
  config.oauth_callback,
  config.oauth_signature
);

module.exports = {
  redirectToTwitterLogin : function(req, res){
    oauth.getOAuthRequestToken(function(err, oauth_token, oauth_token_secret, results){
      if (err) {
        console.log(err)
        res.send('Authentication Failed')
      }

      else{
        res.cookie('oauth_token', oauth_token, {httponly: true})
        res.cookie('oauth_secret', oauth_token_secret, {httponly: true})

      res.redirect(config.authorize_url + '?oauth_token=' + oauth_token);
    }
    })
  },



}
