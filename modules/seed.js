'use strict';

const MovieModel = require('../models/movies.js');
const addMovie = require('./addMovie.js');

async function seed(req, res) {
  try {
    let moviesCurrentlyInDB = await MovieModel.find({});
    if (moviesCurrentlyInDB.length === 0) {
      await addMovie({
        title: 'Eternal Sunshine of the Spotless Mind',
        overview:
          'Joel Barish, heartbroken that his girlfriend underwent a procedure to erase him from her memory, decides to do the same. However, as he watches his memories of her fade away, he realises that he still loves her, and may be too late to correct his mistake.',
        average_votes: 8.1,
        total_votes: 11991,
        image_url:
          'https://www.themoviedb.org/t/p/w500//5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg',
        popularity: 45.844,
        released_on: '2004-03-19',
        tmdbID: 38,
        comment: '',
        email: 'mrossee@hotmail.com',
      });
      await addMovie({
        title: 'Defending Your Life',
        overview:
          'In an afterlife resembling the present-day US, people must prove their worth by showing in court how they have demonstrated courage.',
        average_votes: 7,
        total_votes: 182,
        image_url:
          'https://www.themoviedb.org/t/p/w500//pkNIdL0fOENFBq3DdTb0M8FB26t.jpg',
        popularity: 8.775,
        released_on: '1991-03-22',
        tmdbID: 12186,
        comment: '',
        email: 'mrossee@hotmail.com',
      });
      await addMovie({
        title: 'Braveheart',
        overview:
          "Enraged at the slaughter of Murron, his new bride and childhood love, Scottish warrior William Wallace slays a platoon of the local English lord's soldiers. This leads the village to revolt and, eventually, the entire country to rise up against English rule.",
        average_votes: 7.9,
        total_votes: 8160,
        image_url:
          'https://www.themoviedb.org/t/p/w500//or1gBugydmjToAEq7OZY0owwFk.jpg',
        popularity: 51.585,
        released_on: '1995-03-14',
        tmdbID: 197,
        comment: '',
        email: 'mrossee@hotmail.com',
      });
      await addMovie({
        title: 'Finding Nemo',
        overview:
          "Nemo, an adventurous young clownfish, is unexpectedly taken from his Great Barrier Reef home to a dentist's office aquarium. It's up to his worrisome father Marlin and a friendly but forgetful fish Dory to bring Nemo home -- meeting vegetarian sharks, surfer dude turtles, hypnotic jellyfish, hungry seagulls, and more along the way.",
        average_votes: 7.8,
        total_votes: 16038,
        image_url:
          'https://www.themoviedb.org/t/p/w500//eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg',
        popularity: 119.202,
        released_on: '2003-05-30',
        tmdbID: 12,
        comment: '',
        email: 'mrossee@hotmail.com',
      });

      moviesCurrentlyInDB = await MovieModel.find({});
      res.status(200).send(`Seeded the database: ${moviesCurrentlyInDB}`);
    } else {
      res
        .status(500)
        .send(
          'could NOT seed the db because you already have movies in it !!!!'
        );
    }
  } catch (error) {
    res.status(500).send(`Error seeding Movie database: ${error}`);
  }
}

module.exports = seed;
