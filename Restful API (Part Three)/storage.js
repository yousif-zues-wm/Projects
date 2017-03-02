var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
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
  },
  getNotes: function(ownerId, friendId, cb){
    var cursor = database.collection('notes').find({owner_id: ownerId, friend_id : friendId});
    cursor.toArray(function(err, note){
      if (err) {
        return cb(err)
      }
      console.log(note);
      cb(null, note.map(function(note){
        return {_id: note._id, content: note.content
        }
      }));
    });
  },
  insertNotes : function(ownerId, friendId, content, cb){
    database.collection('notes').insert({
      owner_id: ownerId, friend_id: friendId, content: content}, function(err, result){
      if (err) {
        return cb(err, result)
      }
      cb(null, {_id: result.ops[0]._id, content: result.ops[0].content})
    })
  },
  updateNote: function(noteId, ownerId, content, cb){
    console.log(`Nut`);
    database.collection('notes').updateOne({
      _id: new ObjectID(noteId),
      owner_id: ownerId
    }, { $set : {content: content}},
  function(err, result){
    if (err) {
    return cb(err);
    }
    console.log(result._id);
    database.collection('notes').findOne({_id: new ObjectID(noteId)}, cb)
    console.log(`UpdateTwo`);

  })
},
deleteNote: function(noteId, ownerId,  cb){
  database.collection('notes').deleteOne({ note_id: noteId, owner_id: ownerId}, function(err, result){
    if (err) {
      return cb(err, result)
    }
    console.log(`Delete`);
  })
}

  }
