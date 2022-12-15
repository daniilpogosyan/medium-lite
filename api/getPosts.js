const getDocs = require("../database/getDocs");

async function getPosts({ excludeContent = true, limit = 20 }) {

  const options = {
    limit,
    exclude: excludeContent ? ['content'] : []
  };

  const collection = await getDocs('posts', options);
  // TODO: options.includeContent
  return collection
}

module.exports = getPosts;