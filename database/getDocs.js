const { getCollection, getIndex } = require("./utils");

async function getDocs(collectionName, { exclude, startId, limit = 10 } = {}) {
  // TODO: use cache
  const collection = await getCollection(collectionName);
  
  let docs;

  // get n=limit docs after doc with given id 
  if (startId) {
    const index = await getIndex(collectionName, 'id');

    //TODO: use binary search (built-in method uses linear search)
    const startEntryIndex = index.findIndex(entry => entry[0] === startId);

    const indexEntries = index.slice(startEntryIndex, startEntryIndex + limit);

    docs = indexEntries.map(entry => {
      const docId = entry[1];
      return collection[docId];
    })
  } else {
    // get first n=limit docs 
    docs = Object.values(collection).slice(0, limit)
  }


  // fitler excluded props
  if (Array.isArray(exclude)) {
    docs = docs.map(doc => {
      return Object.fromEntries(
        Object.entries(doc)
        .filter(entry => !exclude.includes(entry[0]))
      )
    })
  }
  

  // TODO: add pagination
  return docs
}

module.exports = getDocs;