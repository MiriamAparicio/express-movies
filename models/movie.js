'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const movieSchema = new Schema({
  name: {
    type: String
  },
  year: {
    type: Number
  },
  director: [{
    type: ObjectId,
    ref: 'Director'
  }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
