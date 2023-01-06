import prisma from './prisma-client';
import * as bcrypt from 'bcryptjs';
import getUserByEmail from './getUserByEmail';

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
  const user = await prisma.users.create({
    data: {
      email,
      passwordHash
    }
  });

  return user 
};

export default createUser;