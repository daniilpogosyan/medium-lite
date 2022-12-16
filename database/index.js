const jsonfile = require('jsonfile');
const path = require('path');


const canSaveSrc = (state) => (
  // TODO: lock file
  async function saveSrc(src) {
    try {
      await jsonfile.writeFile(state.path, src, {spaces: 2});
    } catch(err) {
      throw new Error(`Unable to write to the ${state.type || ''} file`);
    }
    return true
  }
)

const canReadSrc = (state) => (
  // TODO: lock file
  async function readSrc() {
    let src;
    try {
      src = await jsonfile.readFile(state.path);
    } catch(err) {
      // if collection does not exist, then create a new one
      if (err.code === 'ENOENT') {
        return state.getEmptyInstance()
      }
      // rethrow error otherwise
      else throw new Error(`Unable to read the ${state.type || ''} file`);
    }
    return src;
  }
);

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