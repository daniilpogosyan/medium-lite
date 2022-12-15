const bcrypt = require('bcryptjs');
const addDoc = require('../database/addDoc');
const getUserByEmail = require('./getUserByEmail');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function createUser(email, password) {
  if (await getUserByEmail(email)) {
    const err = new Error('This email is in use');
    err.name = 'EmailInUse'
    throw err
  }

  const passwordHash = await hashPassword(password);
  const user = { email, passwordHash };

  // TODO: check if a user with `email` already exists in db
  // *use email index to check

  return addDoc(user, 'users');
};

module.exports = createUser;