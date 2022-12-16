const path = require('path');

const { canReadSrc, canSaveSrc } = require('./composing-functions');

const index = (collectionName, property) => {
  const state = {
    path: path.resolve(__dirname, 'indexes', `${collectionName}_${property}.json`),
    type: 'index',
    cache: [],
    getEmptyInstance: () => ([])
  }

  const readSrc = canReadSrc(state);
  const saveSrc = canSaveSrc(state);


  async function addDoc(doc)  {
    const existingEntry = getEntry(doc[property]);
    if (existingEntry !== undefined) {
      const ids = existingEntry[1];
      if (ids.includes(doc.id)) return
      ids.push(doc.id);
    } else {
      const newEntry = [ doc[property], [doc.id] ];;
      state.cache.push(newEntry);
      state.cache.sort((a, b) => {
        if (a[0] > b[0]) return 1
        if (a[0] < b[0]) return -1
        return 0
      });
    }
    
    await saveSrc(state.cache);
  }

  function getEntry(propValue) {
    // TODO: use binary search
    return state.cache.find(entry => entry[0] === propValue);
  }

  function getIdsByPropValue(propValue) {
    const entry = getEntry(propValue);
    return entry ? entry[1] : []
  }
  

  // Initialize
  readSrc().then(src => state.cache = src);

  return {
    addDoc,
    getIdsByPropValue
  }
}

module.exports = index;