var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  // Connected!
  console.log("Connected to server correctly.");

  // create a new dish
  var newDish = Dishes({
    name: 'Uthapizza',
    description: 'Test'
  });

  // save the dish
  newDish.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('Dish created!');

    // get all the dishes
    Dishes.find({}, function(err, dishes) {
      if (err) throw err;

      // object of all the dishes
      console.log(dishes);
      db.collection('dishes').drop(function() {
        db.close();
      });
    });
  });
});
