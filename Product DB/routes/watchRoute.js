var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Watches = require('../models/watches');

var watchRoute = express.Router();
watchRoute.use(bodyParser.json());

watchRoute.route('/')
.get(function (req, res, next) {
    Watches.find({}, function (err, Watch) {
        if (err) throw err;
        res.json(Watch);
    });
})

.post(function (req, res, next) {
    Watches.create(req.body, function (err, Watch) {
        if (err) throw err;
        console.log('Watch Added!');
        var id = Watch._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Watch with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Watches.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

watchRoute.route('/:WatchId/comments')
.get(function (req, res, next) {
    Watches.findById(req.params.WatchId, function (err, Watch) {
        if (err) throw err;
        res.json(Watch.comments);
    });
})

.post(function(req, res, next){
  Watches.findById(req.params.WatchID, function (err, Watch){
    if (err) throw err;
    Watch.comments.push(req.body);
    Watch.save(function (err, Watch){
      if (err) throw err;
      console.log("Updated Comments!");
      res.json(Watch);
    });
  });
})

.delete(function(req, res, next) {
  Watches.findById(req.params.WatchId, function (err, Watch) {
    if (err) throw err;
    for (var i = (Watch.comment.length - 1); i >= 0; i--){
      Watch.comments.id(Watch.comments[i]._id).remove();
    }
    Watch.save(function (err, result){
      if (err) throw err;
      res.write(200, {
        'Content-Type' : 'text/plain'
      });
        res.end('Deleted all comments!');
    });
  });
});


watchRoute.route('/:WatchId')
.put(function (req, res, next) {
    Watches.findById(req.params.WatchId, function (err, Watch) {
        if (err) throw err;
        console.log('Watch found!');

        Watches.update({_id: Watch._id}, req.body, function(err, updatedWatch){
          console.log(updatedWatch);
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          });
          res.end('Updated the Watch with id: ' + Watch._id);
        });
    });
})

.delete(function (req, res, next) {
   Watches.findById(req.params.WatchId, function (err, Watch) {
       Watch.remove();

       res.writeHead(200, {
           'Content-Type': 'text/plain'
       });
       res.end('Removed the Watch with id: ' + Watch._id);
   });
});


watchRoute.route('/:WatchId/comments/:commentId')
.get(function (req, res, next) {
   Watches.findById(req.params.WatchId, function (err, Watch) {
       if (err) throw err;
       res.json(Watch.comments.id(req.params.commentId));
   });
})

.put(function (req, res, next) {
   // We delete the existing commment and insert the updated
   // comment as a new comment
   Watches.findById(req.params.WatchId, function (err, Watch) {
       if (err) throw err;
       Watch.comments.id(req.params.commentId).remove();
       Watch.comments.push(req.body);
       console.log(req.body);
       Watch.save(function (err, Watch) {
           if (err) throw err;
           console.log('Updated Comments!');
           res.json(Watch);
       });
   });
})

.delete(function (req, res, next) {
   Watches.findById(req.params.WatchId, function (err, Watch) {
       Watch.comments.id(req.params.commentId).remove();
       Watch.save(function (err, resp) {
           if (err) throw err;
           res.json(resp);
       });
   });
});

module.exports = watchRoute;





// .put(function (req, res, next) {
//     Watches.findByIdAndUpdate(req.params.WatchId, {
//         $set: req.body
//     }, {
//         new: true
//     }, function (err, Watch) {
//         if (err) throw err;
//         res.json(Watch);
//     });
// })
//
// .delete(function (req, res, next) {
//     Watches.findByIdAndRemove(req.params.WatchId, function (err, resp) {        if (err) throw err;
//         res.json(resp);
//     });
// });
//
// module.exports = watchRoute;
