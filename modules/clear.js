'use strict';

const MovieModel = require('../models/movies.js');

async function clear(req, res) {
  try {
    await MovieModel.deleteMany({});
    res
      .status(200)
      .send(
        'success - we deleted the whole data base <<<<<<====================================='
      );
  } catch (error) {
    res.status(500).send(`Error clearing the database: ${error}`);
  }
}

module.exports = clear;
