const query = require('../database/query');

async function getUserByEmail(email) {
  const user = await query('users', {email});
  
  return user;
}

module.exports = getUserByEmail;