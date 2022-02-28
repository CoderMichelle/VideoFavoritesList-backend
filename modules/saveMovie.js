'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const MovieModel = require('../models/movies.js');

async function saveMovie(req, res) {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send(`invalid token error: ${err}`);
        } else {
          console.log('req.body from saveMovie/post: ', req.body);
          let {
            title,
            overview,
            average_votes,
            total_votes,
            image_url,
            popularity,
            released_on,
            tmdbID,
            comment,
            email,
          } = req.body;
          let newMovieSaved = new MovieModel({
            title,
            overview,
            average_votes,
            total_votes,
            image_url,
            popularity,
            released_on,
            tmdbID,
            comment,
            email,
          });
          let responseFromDB = await newMovieSaved.save();
          res.status(200).send(responseFromDB);
        }
      });
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
        `Something went wrong with trying to read that token..... on the post route ${error}`
      );
  }
}

module.exports = saveMovie;
