const { getCollection, getIndex } = require("./utils");

async function getDocs(collectionName, { exclude, page = 1, limit = 10 } = {}) {
  // TODO: use cache
  const collection = await getCollection(collectionName);
  
  let docs;
  docs = Object.values(collection).slice((page - 1) * limit, page * limit)

  // fitler excluded props
  if (Array.isArray(exclude)) {
    docs = docs.map(doc => {
      return Object.fromEntries(
        Object.entries(doc)
        .filter(entry => !exclude.includes(entry[0]))
      )
    })
  }
  
  return docs
}

module.exports = getDocs;