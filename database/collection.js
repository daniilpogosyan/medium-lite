const path = require('path');
const uniqid = require('uniqid');

const { canReadSrc, canSaveSrc } = require('./composing-functions');

const collection = (collectionName) => {
  const state = {
    path: path.resolve(__dirname, 'collections', `${collectionName}.json`),
    type: 'collection',
    cache: {},
    getEmptyInstance: () => ({})
  }

  const readSrc = canReadSrc(state);
  const saveSrc = canSaveSrc(state);
  
  async function addDoc(doc) {
    const src = await readSrc();
    doc.id = uniqid();
    src[doc.id] = doc;
    state.cache[doc.id] = doc;
    await saveSrc(src);
  }

  async function getDocById(id) {
    // check cache at first
    if (state.cache[id] !== undefined) {
      return state.cache[id]
    }

    // else check src 
    const src = await readSrc();
    if (src[id] !== undefined) {
      // store doc in cache for future use
      state.cache[id] = src[id];
      return src[id]
    }

    // if doc is not found
    return null
  }

  function excludeProps(doc, exclude = []) {
    return Object.fromEntries(
        Object.entries(doc)
        .filter(entry => !exclude.includes(entry[0]))
    )
  }

  function docMeetsQuery(doc, query) {
    for (const [param, value] of Object.entries(query)) {
      if (doc[param] !== value) {
        return false;
      }
    }
  
    return true;
  }

  async function getDocs({query = {}, exclude = [], page = 1, limit = 10 } = {}) {
    const collection = await readSrc();
    const docs = Object.values(collection)
      .filter((doc) => docMeetsQuery(doc, query))
      .slice((page - 1) * limit, page * limit)
      .map(doc => excludeProps(doc, exclude));    
    
    // TODO: implement using indexes 

    // TODO: setInCache(docs)
    // probably including query data somehow,

    return docs;
  }

  return {
    addDoc,
    getDocById,
    getDocs
  }
}

module.exports = collection
