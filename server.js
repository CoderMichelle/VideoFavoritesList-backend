'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const errorHandler = require('./modules/404.js');
const proof = require('./modules/proof.js');

const PORT = process.env.PORT || 3001;

// app.use is global middleware
app.use(cors());
app.use(express.json());

app.get('/', proof);


app.get('/movies', getMovies);

app.get('*', errorHandler);

async function getMovies(req, res) {
  // const query = req.query;
  const { movieName } = req.query;
  console.log('query is currently', movieName);
  if (movieName) {
    try {
      let movieURI = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false`;
      let movieResults = await axios.get(movieURI);
      const movieResultsArray = movieResults.data.results.length
        ? movieResults.data.results.map(
          eachMovieObject => new Movie(eachMovieObject)
        )
        : [];
      console.log('here are them movie results ARRAY', movieResultsArray);
      let imdbMovieURI = `https://imdb-api.com/en/API/Trailer/${process.env.IMDB_API_KEY}/tt1375666`;
      let imdbResults = await axios.get(imdbMovieURI);
      console.log('here is IMDB =====================>>>>>>>', imdbResults.data);
      res.status(200).send(movieResultsArray);
    } catch (error) {
      console.log(
        'there was an error trying to get the movies from the API',
        error
      );
      res.status(404).send(error);
    }
  } else {
    res
      .status(500)
      .send(
        'you did not provide a valid search term (movieName=THE_MOVIE_YOU_ARE_SEARCHING_FOR'
      );
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path
      ? `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`
      : 'https://getwallpapers.com/wallpaper/full/4/c/8/374853.jpg';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
    this.tmdbID = movie.id;
  }
}

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to the database =========>>>>>>>>>>>>>>>>>>>');
    app.listen(PORT, () =>
      console.log(`listening in on port https://localhost:${PORT}`)
    );
  })
  .catch(error => {
    console.log(
      `There was an error connecting to db and then server: ${error}`
    );
  });

