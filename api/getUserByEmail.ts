import query from '../database/query';

async function getUserByEmail(email: string) {
  const user = await query('users', { email });  
  return user;
}

export default getUserByEmail;