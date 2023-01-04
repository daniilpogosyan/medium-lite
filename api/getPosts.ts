import getDocs from "../database/getDocs";

type Opts = {
  userID?: number;
  excludeContent?: boolean;
  limit?: number;
  page?: number;
}

async function getPosts({ userID,  excludeContent = true, limit = 10, page = 1 }: Opts) {
  const options = {
    userID,
    limit,
    page,
    exclude: excludeContent ? ['content'] : []
  };

  const sql = userID !== undefined
  ? `posts JOIN users ON posts.authorID=users.id AND users.id=${userID}`
  : `posts JOIN users ON posts.authorID=users.id`

  const posts = await getDocs(sql, options);
  return posts
}

export default getPosts;