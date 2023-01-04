import getDoc from '../database/getDoc';


async function getUserByEmail(email: string) {
  const sql = `SELECT * FROM users WHERE users.email='${email}'`;
  const user = await getDoc(sql);
  return user;
}

export default getUserByEmail;