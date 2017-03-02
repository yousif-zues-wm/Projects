var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var leadRouter = express.Router();
var dishRouter = express.Router();
var promoRouter = express.Router();

dishRouter.use(bodyParser.json());
leadRouter.use(bodyParser.json());
promoRouter.use(bodyParser.json());



promoRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
.get(function(req,res,next){
  res.end('Sending Promo Info to You');
})
.post(function(res,req,next){
  res.end('Adding ' + req.body.name + ' Desc: ' + req.body.description);
})
.delete(function(res,req,next){
        res.end('All Promotions Deleted!');
});

promoRouter.route('/:leadId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Sending Details of  ' + req.params.leadId);
})

.put(function(req, res, next){
        res.write('Updating: ' + req.params.leadId + '\n');
    res.end('Will update: ' + req.body.name +
            ' with: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting: ' + req.params.leadId);
});
promoRouter.route('/:promoId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Sending Details of  ' + req.params.promoId);
})

.put(function(req, res, next){
        res.write('Updating: ' + req.params.promoId + '\n');
    res.end('Will update: ' + req.body.name +
            ' with: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting: ' + req.params.promoId);
});

leadRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})
.get(function(req,res,next){
  res.end('Sending Leadership Info to You');
})
.post(function(res,req,next){
  res.end('Adding ' + req.body.name + ' Desc: ' + req.body.description);
})
.delete(function(res,req,next){
        res.end('All leaders Deleted!');
});

leadRouter.route('/:leadId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Sending Details of  ' + req.params.leadId);
})

.put(function(req, res, next){
        res.write('Updating: ' + req.params.leadId + '\n');
    res.end('Will update: ' + req.body.name +
            ' with: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting: ' + req.params.leadId);
});

dishRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the dishes to you!');
})

.post(function(req, res, next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all dishes');
});

dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

app.use('/dishes',dishRouter);
app.use('/leadership', leadRouter);
app.use('/promo', promoRouter);
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
