import getDocs from "../database/getDocs";
import { isPositiveInteger } from "../utils";

type Opts = {
  userID?: number;
  limit?: number;
  page?: number;
}

async function getPosts(options: Opts) {
  let sql = `SELECT * FROM posts JOIN users ON posts.authorID=users.ID`;

  if(options.userID !== undefined) {
    sql += ` WHERE users.ID=${options.userID}`;
  }

  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  sql += ` LIMIT ${limit} OFFSET ${offset}`;
  console.log(sql)
  const posts = await getDocs(sql);
  return posts
}

export default getPosts;