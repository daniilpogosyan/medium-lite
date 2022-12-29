import getDocs from "../database/getDocs";

type Opts = {
  excludeContent?: boolean;
  limit?: number;
  page?: number;
}

async function getPosts({ excludeContent = true, limit = 10, page = 1 }: Opts) {
  const options = {
    limit,
    page,
    exclude: excludeContent ? ['content'] : []
  };

  const posts = await getDocs('posts', options);
  return posts
}

export default getPosts;