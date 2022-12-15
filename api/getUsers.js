const getDocs = require("../database/getDocs");

async function getUsers({ limit = 10, page } = {}) {
  const options = {
    limit,
    page,
    exclude: ['passwordHash']
  };

  const users = await getDocs('users', options);
  return users
}

module.exports = getUsers;