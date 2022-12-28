import * as bcrypt from 'bcryptjs';
import addDoc from '../database/addDoc';
import getUserByEmail from './getUserByEmail';
import { LeanUser } from './schemas';

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  return passwordHash;
}

async function createUser(email: string, password: string) {
  if (await getUserByEmail(email)) {
    const err = new Error('This email is in use');
    err.name = 'EmailInUse'
    throw err
  }

  const passwordHash = await hashPassword(password);
  const user: LeanUser = { email, passwordHash };

  // TODO: check if a user with `email` already exists in db
  // *use email index to check

  return addDoc(user, 'users');
};

export default createUser;