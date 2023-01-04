import getDocs from '../database/getDocs';
import { isPositiveInteger } from '../utils';

type Opts = {
  limit?: number,
  page?: number
}

async function getUsers(options: Opts) {
  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  const sql = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;

  const users = await getDocs(sql);
  return users
}

export default getUsers;