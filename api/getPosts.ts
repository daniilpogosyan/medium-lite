import getDocs from "../database/getDocs";

async function getPosts({ excludeContent = true, limit = 10, page } = {}) {
  const options = {
    limit,
    page,
    exclude: excludeContent ? ['content'] : []
  };

  const posts = await getDocs('posts', options);
  return posts
}

export default getPosts;