const getDocs = require("../database/getDocs");

async function getPosts() {
  const collection = await getDocs('posts');
  
  // TODO: options.includeContent
  return collection
}

module.exports = getPosts;