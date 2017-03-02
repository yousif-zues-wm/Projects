var config = require('./config');
var authenticator = require('./authenticator');
var querystring = require('querystring');
var asynch = require('async');
var url = require('url');
var express = require('express');
var app = express();
var hostname = "localhost";
var Twitter = require('twitter')
var client = new Twitter({
consumer_key: config.consumer_key,
consumer_secret: config.consumer_secret,
access_token_key: config.access_token_key,
access_token_secret: config.access_token_secret
})
//add cookie parsing ability to our appa
app.set('view engine', 'ejs');
app.use(require('cookie-parser')());
app.get('/auth/twitter' , authenticator.redirectToTwitterLoginPage);
app.get(url.parse(config.oauth_callback).path , function(req , res) {
  authenticator.authenticate(req , res, function(err){
    if (err) {
      console.log(err)
      res.redirect('/');
}
      res.redirect('/');

  })
})
app.get('/', function(req, res, next){
    console.log(req.cookies.twitter_id)

      if (req.cookies.twitter_id === undefined) {
        res.status(200).render('index', { title: 'Please Sign in'})
      }
      else{
          client.get('users/show', { id: req.cookies.twitter_id, count: 20 }, function(error, user, response) {
      res.status(200).render('index1', { user: user })
    })
    }

})


app.get('/tweet' , function(req , res){
  if (!req.cookies.access_token || !req.cookies.access_token_secret) {
    return res.sendStatus(401);
  }
  //tweet
  authenticator.post('https://api.twitter.com/1.1/statuses/update.json' ,
                      req.cookies.access_token ,
                      req.cookies.access_token_secret,
                    {
                      status : "School doesn't feel that bad this semester tbh"
                    },
                  function(error , data){
                    if (error){
                      return res.status(400).send(error);
                    }
                    res.send('Tweet successful!');
          });
});
//search
app.get('/search' , function(req , res){
  if (!req.cookies.access_token ||
      !req.cookies.access_token_secret) {
        return res.sendStatus(401);
  }
  authenticator.get('https://api.twitter.com/1.1/search/tweets.json?' + querystring.stringify({q: "'School doesn't feel that bad this semester tbh"}),
  req.cookies.access_token ,
  req.cookies.access_token_secret,
  function(error , data){
    if (error){
      return res.status(400).send(error);
    }
    res.send(data);
  });
});
app.get('/friends', function(req,res) {
  if (!req.cookies.access_token ||
      !req.cookies.access_token_secret) {
        return res.sendStatus(401);
  }
  var url = 'https://api.twitter.com/1.1/friends/list.json';
  if (req.query.cursor) {
  url += '?' + querystring.stringify({ cursor : req.query.cursor})
  }
  authenticator.get(url, req.cookies.access_token,
  req.cookies.access_token_secret, function(error, data) {
    if (error){
      return res.status(400).send(error);
    }
    res.send(data);
  });
});
app.get('/allfriends', function(req, res) {
  if (!req.cookies.access_token ||
      !req.cookies.access_token_secret) {
        return res.redirect('/login');
  }
});
function renderMainPageFromTwitter(req,res){
  asynch.waterfall([
      // get the friends id_str
      function(cb) {
        var cursor = -1;
        var ids = [];
        console.log(' 1) ids[] length:' + " " + ids.length);
        //get IDs by traversing cursored collection
        asynch.whilst(function(){
          return cursor != 0;
        }, function(cb) {
          authenticator.get('https://api.twitter.com/1.1/friends/ids.json?' + querystring.stringify({user_id : req.cookies.twitter_id, cursor : cursor}), req.cookies.access_token ,
            req.cookies.access_token_secret, function(error, data) {
              if (error){
                return res.status(400).send(error);
              }
              data = JSON.parse(data);
              cursor = data.next_cursor_str;
              ids = ids.concat(data.ids);
              cb();
            });
          }, function(error) {
              if (error) {
                return res.status(500).send(error);
              }
              cb(null, ids);
            });
      },
      // get the friends data using the IDs
      function(ids, cb) {
        console.log('2) ids[] length:' + " " + ids.length);
        // res.send(ids); old way of checking
        //returns 100 IDs starting from 100*i
        var getHundredthIds = function(i) {
          return ids.slice(100*i, Math.min(ids.length, 100*(i+1)));
        }
        var requestsNeeded = Math.ceil(ids.length/100);
        asynch.times(requestsNeeded, function (n, next) {
          var url =
          'https://api.twitter.com/1.1/users/lookup.json?' + querystring.stringify({user_id: getHundredthIds(n).join(',')});
          authenticator.get(url,
          req.cookies.access_token,
        req.cookies.access_token_secret,
      function(error, data){
        if(error) {
          return res.status(400).send(error);
}
        var friends = JSON.parse(data);
        next(null, friends);
      });
    },
    function(err, friends) {
      //flatten friends array
      friends = friends.reduce(function(previousValue, currentValue, currentIndex, array) {
        return previousValue.concat(currentValue);
      }, []);
      //sort the friends alphabetically by name
      friends.sort(function(a,b) {
        return
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      });
      res.send(friends);
    });
  }
  ]);
}
app.get('/login' , function(req , res , body) {
  res.render('login');
});
//serve static from public
app.use(express.static(__dirname + '/public'));
var server = app.listen(config.port, function(){
  console.log(`Server is running on ${hostname}:${config.port}`);
  console.log('Oauth callback: ' +
      url.parse(config.oauth_callback).hostname +
      url.parse(config.oauth_callback).path
    )
});




































// var express = require('express')
// var app = express();
// var hostname = 'localhost'
// var authenticator = require('./authenticator')
// var url = require('url')
// var config = require('./config')
// var Twitter = require('twitter')
// var asynch = require('async')
// var bodyParser = require('body-parser')
// var querystring = require('querystring')
// var client = new Twitter({
// consumer_key: config.consumer_key,
// consumer_secret: config.consumer_secret,
// access_token_key: config.access_token_key,
// access_token_secret: config.access_token_secret
// })
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.use(require('cookie-parser')());
//
// app.get('/', function(req, res, next){
//   client.get('users/show', { screen_name: 'talkvhs', count: 20 }, function(error, user, response) {
//     if (!error) {
//       if (req.param('oauth_token') === undefined) {
//         res.status(200).render('index', { title: 'Please Sign in'})
//       }
//       else{
//       res.status(200).render('index1', { title: 'Twitter Account', user: user })
//       }
//     }
//     else {
//       res.status(500).json({ error: error })
//     }
// })
// })
// app.get('/auth/twitter', authenticator.redirectToTwitterLogin);
//
// app.post('/tweet', function(req, res, next){
//   if (!req.cookies.access_token || !req.cookies.access_token_secret) {
//     return res.redirect('/');
//     }
//     authenticator.post('https://api.twitter.com/1.1/statuses/update.json', req.cookies.access_token, req.cookies.access_token_secret, {status : req.param('tweet')}, function(err, data){
//       if (err) {
//         return res.status(400).send(err);
//       }
//       console.log(req.param('tweet'))
//     })
// });
//
// app.get('/search', function(req, res, next){
//   if (!req.cookies.access_token || !req.cookies.access_token_secret) {
//     return res.redirect('http://73f8f004.ngrok.io/');
//     }
//     authenticator.get(`https://api.twitter.com/1.1/search/tweets.json?${querystring.stringify({q: req.param('tweet')})}`, req.cookies.access_token, req.cookies.access_token_secret, function(err, data){
//       if (err) {
//         return res.status(400).send(err);
//       }
//       res.send(data)
//     });
// })
//
//
// app.get('/friends', function(req,res) {
//   if (!req.cookies.access_token ||
//       !req.cookies.access_token_secret) {
//         return res.sendStatus(401);
//   }
//   var url = 'https://api.twitter.com/1.1/friends/list.json';
//   if (req.query.cursor) {
//   url += '?' + querystring.stringify({ cursor : req.query.cursor})
//   }
//   authenticator.get(url, req.cookies.access_token,
//   req.cookies.access_token_secret, function(error, data) {
//     if (error){
//       return res.status(400).send(error);
//     }
//     res.send(data);
//   });
// });
// app.get('/allfriends', function(req, res) {
//   asynch.waterfall([
//
//       function(cb) {
//         var cursor = -1;
//         var ids = [];
//         console.log(' 1) ids[] length:' + " " + ids.length);
//
//         asynch.whilst(function(){
//           return cursor != 0;
//         }, function(cb) {
//           authenticator.get('https://api.twitter.com/1.1/friends/ids.json?' + querystring.stringify({user_id : req.cookies.twitter_id, cursor : cursor}), req.cookies.access_token ,
//             req.cookies.access_token_secret, function(error, data) {
//               if (error){
//                 return res.status(400).send(error);
//               }
//               data = JSON.parse(data);
//               cursor = data.next_cursor_str;
//               ids = ids.concat(data.ids);
//               cb();
//             });
//           }, function(error) {
//               if (error) {
//                 return res.status(500).send(error);
//               }
//               cb(null, ids);
//             });
//       },
//
//       function(ids, cb) {
//         console.log('2) ids[] length:' + " " + ids.length);
//         var getHundredthIds = function(i) {
//           return ids.slice(100*i, Math.min(ids.length, 100*(i+1)));
//         }
//         var requestsNeeded = Math.ceil(ids.length/100);
//         asynch.times(requestsNeeded, function (n, next) {
//           var url =
//           'https://api.twitter.com/1.1/users/lookup.json?' + querystring.stringify({user_id: getHundredthIds(n).join(',')});
//           authenticator.get(url,
//           req.cookies.access_token,
//         req.cookies.access_token_secret,
//       function(error, data){
//         if(error) {
//           return res.status(400).send(error);
// }
//         var friends = JSON.parse(data);
//         next(null, friends);
//       });
//     },
//     function(err, friends) {
//       friends = friends.reduce(function(previousValue, currentValue, currentIndex, array) {
//         return previousValue.concat(currentValue);
//       }, []);
//       friends.sort(function(a,b) {
//         return
//         a.name.toLowerCase().localeCompare(b.name.toLowerCase())
//       });
//       res.send(friends);
//     });
//   }
//   ]);
// });
// app.get(url.parse(config.oauth_callback).path, function(req, res){
//   authenticator.authenticate(req, res, function(err){
//     if (err) {
//       console.log(err)
//       res.render('index', function(err, user){
//       res.send('Login Failed, Please Try Again')
//       })
//     }
//     else{
//       app.get('/', function(req, res, next){
//         client.get('users/show', { id_str: data.id_str, count: 20 }, function(error, user, response) {
//           if (!error) {
//             if (req.param('oauth_token') === undefined) {
//               res.status(200).render('index', { title: 'Please Sign in'})
//             }
//             else{
//             res.status(200).render('index1', { title: 'Twitter Account', user: user })
//             }
//           }
//           else {
//             res.status(500).json({ error: error })
//           }
//       })
//       })
//     }
//   })
// })
//
//
// app.listen(config.port, function() {
// console.log(`Server running on ${hostname}:${config.port}`);
// })
