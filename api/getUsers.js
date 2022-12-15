const getDocs = require("../database/getDocs");

async function getUsers({ limit = 10, startId } = {}) {
  const options = {
    limit,
    startId,
    exclude: ['passwordHash']
  };

  const users = await getDocs('users', options);
  return users
}

module.exports = getUsers;