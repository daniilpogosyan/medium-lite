const getDocs = require("../database/getDocs");

async function getUsers(options) {
  const users = await getDocs('users');
  return users;
}

module.exports = getUsers;