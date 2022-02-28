'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const MovieModel = require('../models/movies.js');

async function getAllDBMovies(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log(
        'getAllDBMovies route hit =======================================>>>>>>>>'
      );
      // =========================================================================
      //temporarily disableing authorization because of JWT heroku problems !!!!
      // await jwt.verify(token, getKey, {}, function (err, user) {
      //   if (err) {
      //     res.status(500).send(`invalid token ${err}`);
      //   } else {
      MovieModel.find({}, (err, dataBaseResults) => {
        if (err) {
          res.status(500).send(`can't access db ${err}`);
        } else {
          res.status(200).json(dataBaseResults);
        }
      });
      // }
      // });
      //===========================================================================
    } else {
      res
        .status(500)
        .send(
          'Looks like you did not send a token in the authorization headers !!!!'
        );
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `Something went wrong with trying to read that token..... on the getAllMoviesFromDB route ${error}`
      );
  }
}

module.exports = getAllDBMovies;
