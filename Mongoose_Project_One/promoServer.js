var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // Connection established
  console.log('Connected correctly to server');

  // Create a new promotion
  Promotions.create({
      "name": "Uthapizza",
      "image": "images/uthapizza.png",
      "label": "Hot",
      "price": "4.99",
      "description": "A unique . . ."
    }, function(err, promotion) {
      if (err) throw err;
      console.log('promotion created!');
      console.log(promotion);

      var id = promotion._id;
      // get all the promotiones
      setTimeout(function() {
        Promotions.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function(err, promotion) {
          if (err) throw err;
          console.log('Updated promotion!');
          console.log(promotion);

          promotion.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling',
            author: 'Leonardo di Carpaccio'
          });

          promotion.save(function(err, promotion) {
            console.log('Updated Comments');
            console.log(promotion);

            db.collection('promotions').drop(function() {
              db.close();
            });
          });
        });
      }, 3000);
    });
});
