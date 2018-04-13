'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: {
    type: String
  },
  nationality: {
    type: String
  }
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;
