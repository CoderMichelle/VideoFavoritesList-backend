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


app.listen(PORT, () =>
  console.log(`listening in on port https://localhost:${PORT}`)
);
