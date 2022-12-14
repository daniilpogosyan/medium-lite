const { getCollection } = require("./utils");

async function getDocs(collectionName, options) {
  // TODO: use cache
  const collection = await getCollection(collectionName);

  // TODO: add pagination
  return Object.values(collection);
}

module.exports = getDocs;