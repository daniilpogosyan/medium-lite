const bcrypt = require('bcryptjs');
const addDoc = require('../database/addDoc');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function createUser(email, password) {
  const passwordHash = await hashPassword(password);
  const user = { email, passwordHash };

  // TODO: check if a user with `email` already exists in db
  // *use email index to check

  addDoc(user, 'users');
};

module.exports = createUser;