'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const MovieModel = require('../models/movies.js');

async function deleteMovie(req, res) {
  try {
    let id = req.params.id;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('delete route hit and here is token =======>>>>>>>>', token);
      // =========================================================================
      //temporarily disableing authorization because of JWT heroku problems !!!!
      // await jwt.verify(token, getKey, {}, async function (err, user) {
      //   if (err) {
      //     res.status(500).send('invalid token');
      //   } else if (!id) {
      //     res
      //       .status(500)
      //       .send(
      //         'we did not receive the ID of the movie you are trying to delete'
      //       );
      //   } else {
      // here goes the code to delete the movie
      let deletedMovie = await MovieModel.findByIdAndDelete(id);
      res.status(200).send(deletedMovie);
      //   }
      // });
      //===========================================================================
    } else {
      res
        .status(500)
        .send(
          'Looks like you did not send a token in the authorization headers !!!!'
        );
    }
  } catch (err) {
    res
      .status(500)
      .send(`Something went wrong with trying to delete this one movie ${err}`);
  }
}

module.exports = deleteMovie;
