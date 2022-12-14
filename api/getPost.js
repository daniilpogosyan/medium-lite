const getDoc = require("../database/getDoc");

async function getPost(id) {
  const post = await getDoc('posts', id);

  // TODO: options.includeContent
  return post
}

module.exports = getPost;