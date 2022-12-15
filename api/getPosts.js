const getDocs = require("../database/getDocs");

async function getPosts({ excludeContent = true, limit = 10, startId } = {}) {
  const options = {
    limit,
    startId,
    exclude: excludeContent ? ['content'] : []
  };

  const posts = await getDocs('posts', options);
  return posts
}

module.exports = getPosts;