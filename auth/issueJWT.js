const jwt = require('jsonwebtoken');

function issueJWT(payload) {
  const options = {
    expiresIn: '3d',
    algorithm: 'HS256'
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}


module.exports = issueJWT
