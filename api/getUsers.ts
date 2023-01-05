import getDocs from '../database/getDocs';
import { isPositiveInteger } from '../utils';

export type Opts = {
  limit?: number,
  page?: number
  includePosts?: boolean
}

async function getUsers(options: Opts) {
  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  let sql: string;
  if (options.includePosts) {
    const columns = "posts.title, posts.id as postID, posts.authorID, users.email"
    const join = "JOIN posts ON posts.authorID=1";
    sql = `SELECT ${columns} FROM users ${join} LIMIT ${limit} OFFSET ${offset}`;  
  } else {
    sql = `SELECT email, ID FROM users LIMIT ${limit} OFFSET ${offset}`;  
  }
  console.log(sql)
  const users = await getDocs(sql);
  return users
}

export default getUsers;