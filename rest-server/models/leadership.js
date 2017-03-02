// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

// var commentSchema = new Schema({
//     rating:  {
//         type: Number,
//         min: 1,
//         max: 5,
//         required: true
//     },
//     comment:  {
//         type: String,
//         required: true
//     },
//     author:  {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// create a schema
var leadershipSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    // comments:[commentSchema],

    image: {
      type: String,
      required: false
    },

    // category: {
    //   type: String,
    //   required: false
    // },

    designation: {
      type: String,
      required: false,
      default: ""
    },

    abbr: {
      type: String,
      required: false
    }

    // price: {
    //   type: Currency,
    //   required: false
    // }


}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Leadership = mongoose.model('Leadership', leadershipSchema);

// make this available to our Node applications
module.exports = Leadership;
