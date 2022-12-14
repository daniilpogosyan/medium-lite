const getDoc = require("../database/getDoc");

async function getUser(id) {
  const user = await getDoc('users', id);
  return user
}

module.exports = getUser;