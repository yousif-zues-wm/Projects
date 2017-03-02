 var express = require('express');
var router = express.Router();
var appdata = require('../data.json')
var myArtwork  =[];

router.get('/:speakerId', function(req, res, next){
  appdata.speakers.forEach(function(item){
    if (item.shortname == req.param('speakerId')) {
      myArtwork = myArtwork.concat(item.artwork);
    }
    res.render('speakers.ejs', {artwork: myArtwork})

  });
});

module.exports = router;
