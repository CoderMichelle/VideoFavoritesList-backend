'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const MovieModel = require('../models/movies.js');

async function getOneMovie(req, res) {
  try {
    let id = req.params.id;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log(
        'getOneMovie route hit and here is token =======>>>>>>>>',
        token
      );

      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else if (!id) {
          res
            .status(500)
            .send(
              'we did not receive the ID of the movie you are trying to access'
            );
        } else {
          // here goes the code to delete the movie
          let retrievedMovie = await MovieModel.find({ id });
          res.status(200).send(retrievedMovie);
        }
      });
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
      .send(
        `Something went wrong with trying to read that token..... on the getOneMovie route ${err}`
      );
  }
}

module.exports = getOneMovie;
