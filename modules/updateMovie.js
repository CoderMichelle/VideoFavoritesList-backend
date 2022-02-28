'use strict';

const jwt = require('jsonwebtoken');
const getKey = require('./getKey.js');
const MovieModel = require('../models/movies.js');

async function updateMovie(req, res) {
  try {
    let id = req.params.id;
    console.log('================== id', id);
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      await jwt.verify(token, getKey, {}, async function (err, user) {
        if (err) {
          res.status(500).send('invalid token');
        } else if (!id) {
          res
            .status(500)
            .send(
              'we did not receive the ID of the book you are trying to delete'
            );
        } else {
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
          let updatedMovie = {
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
          };
          console.log('\n here is the updated Movie: ', updatedMovie);
          try {
            let results = await MovieModel.findByIdAndUpdate(id, updatedMovie, {
              new: true,
              overwrite: true,
            });
            if (results) {
              console.log('success, updated DB', results);
              res.status(200).json(results);
            } else {
              console.log('RESULTS to update a movie', results);
              console.log('error trying to update a movie');
              res.status(500).send(`can't access db ${results}`);
            }
          } catch (error) {
            console.log('there was an error inside of update', error);
            res
              .status(500)
              .send(
                `Something went wrong with trying to read that token..... on the updateMovie route: ${error}`
              );
          }
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
        `Something went wrong with trying to read that token..... on the updateMovie route ${err}`
      );
  }
}

module.exports = updateMovie;
