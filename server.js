'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 3001;

// app.use is global middleware
app.use(cors());

app.get('/', (req, res) => {
  console.log(
    'we are up and running on slash / route and hello from the server ====== proof of life'
  );
  res.status(200).send('proof of life - hello from the server');
});


app.get('/movies', getMovies);

app.get('/*', (req, res) => {
  res.status(404).send('could not find that route');
});

async function getMovies(req, res) {
  // const query = req.query;
  const { movieName } = req.query;
  console.log('query is currently', movieName);
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

app.listen(PORT, () =>
  console.log(`listening in on port https://localhost:${PORT}`)
);
