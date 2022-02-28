'use strict';

function proof(req, res) {
  console.log(
    'we are up and running on slash / route and hello from the server ====== proof of life'
  );
  res.status(200).send('proof of life - hello from the server');
}

module.exports = proof;
