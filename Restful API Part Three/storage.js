var MongoClient = require('mongodb').MongoClient;
var database;
module.exports = {
  connect : function(){
    MongoClient.connect(`mongodb://localhost:27017/twitter_notes`, function(err, db){
      if (err) {
        console.log(err)
      }
      database = db;
    })
  },
  connected: function(){
    console.log(`typeof database: ${(typeof database)}`)
    return typeof database != 'undefined';
  },
  insertFriends: function(friends){
    database.collection('friends').insert(friends, function(err){
      if (err) {
      console.log(er)
    }

    })
  },
  getFriends: function(userId, cb){
    var cursor = database.collection('friends').find({for_user: userId});

    cursor.toArray(cb)
  },
  deleteFriends: function(req, res){
    database.collection('friends').remove({}, function(err){
      if (err) {
        console.log(`deleteFriends Error: ${err}`);
      }
    })
  }
  }
