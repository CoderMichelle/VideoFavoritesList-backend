'use strict';

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: false },
  average_votes: { type: Number, required: false },
  total_votes: { type: Number, required: false },
  image_url: { type: String, required: false },
  popularity: { type: Number, required: false },
  released_on: { type: String, required: false },
  tmdbID: { type: Number, required: false },
  comment: { type: String, required: false },
  email: { type: String, required: true },
});

const MovieModel = mongoose.model('moviesTable', movieSchema);

module.exports = MovieModel;
