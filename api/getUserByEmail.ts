import query from '../database/query';

async function getUserByEmail(email) {
  const user = await query('users', { email });  
  return user;
}

export default getUserByEmail;