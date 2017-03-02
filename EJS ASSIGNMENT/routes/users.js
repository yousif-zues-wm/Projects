var express = require('express');
var router = express.Router();
var user = require('../data.json')

router.get('/', function(req, res, next){
  res.render('index1.ejs');
})
module.exports = router;
