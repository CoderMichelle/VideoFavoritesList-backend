'use strict';

const MovieModel = require('../models/movies.js');

async function addMovie(movieObj) {
  let newMovie = new MovieModel(movieObj);
  return await newMovie.save();
}

module.exports = addMovie;
