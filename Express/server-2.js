var express = require('express');
var morgan = require('morgan');
var http = require('http');
var hostname = "localhost";
var port = 3000;
var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.listen(port, hostname, function(){
  console.log(`Running on ${hostname}:${port}`);
});
