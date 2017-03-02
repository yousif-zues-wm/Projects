var mongoose = require('mongoose'),
    assert = require('assert');

var Leaderships = require('./models/Leaderships');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // Connection established
  console.log('Connected correctly to server');

  // Create a new leadership
  Leaderships.create({
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "designation": "mains",
      "abbr": "ABC",
      "description": "A unique . . ."
    }, function(err, leadership) {
      if (err) throw err;
      console.log('leadership created!');
      console.log(leadership);

      var id = leadership._id;
      // get all the Leaderships
      setTimeout(function() {
        Leaderships.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, leadership) {
          if (err) throw err;
          console.log('Updated leadership!');
          console.log(leadership);

          leadership.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling',
            author: 'Leonardo di Carpaccio'
          });

          leadership.save(function(err, leadership) {
            console.log('Updated Comments');
            console.log(leadership);

            db.collection('leaderships').drop(function() {
              db.close();
            });
          });
        });
      }, 3000);
    });
});
