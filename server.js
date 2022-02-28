'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const axios = require('axios');
const mongoose = require('mongoose');

const errorHandler = require('./modules/404.js');
const testLogin = require('./modules/test.js');
const seed = require('./modules/seed.js');
const proof = require('./modules/proof.js');
const clear = require('./modules/clear.js');

const getMoviesFromAPI = require('./modules/getMoviesFromAPI.js');
const getAllDBMovies = require('./modules/getAllDBMovies.js');
const getOneMovie = require('./modules/getOneMovie.js');
const saveMovie = require('./modules/saveMovie.js');
const updateMovie = require('./modules/updateMovie.js');
const deleteMovie = require('./modules/deleteMovie.js');

const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', proof);
app.get('/login-test', testLogin);
app.get('/seed', seed);
app.get('/clear', clear);

app.get('/dbmovies/:id', getOneMovie);
app.get('/dbmovies', getAllDBMovies);
app.post('/dbmovies', saveMovie);
app.put('/dbmovies/:id', updateMovie);
app.delete('/dbmovies/:id', deleteMovie);


app.get('/movies', getMoviesFromAPI);

app.get('*', errorHandler);

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

