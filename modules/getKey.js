'use strict';

const jwksClient = require('jwks-rsa');
// this function comes directly from the jsonwebtoken docs
const client = jwksClient({
  // this url comes from your app on the auth0 dashboard and gets stored in the .env file
  jwksUri: process.env.AUTH0_JWKS_URI,
});
// this function comes directly from the jsonwebtoken docs
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

module.exports = getKey;
