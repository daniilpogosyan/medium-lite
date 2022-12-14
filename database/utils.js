const jsonfile = require('jsonfile');
const path = require('path');


function getPathToCollection(name) {
  return path.resolve(__dirname, 'collections', `${name}.json`);
} 

async function getCollection(name) {
  const pathToCollection = getPathToCollection(name);

  let collection;

  try {
    collection = await jsonfile.readFile(pathToCollection);
  } catch(err) {
    // if collection does not exist, then create a new one
    if (err.code === 'ENOENT') {
      await jsonfile.writeFile(pathToCollection, {});
      collection = {};
    }
    // rethrow error otherwise
    else throw err;
  }

  return collection;
}

async function saveCollection(collectionData, name) {
  const pathToCollection = getPathToCollection(name);
  // TODO: check if collectionData could be stored as json
  // *probably it could be solved with Typescript

  jsonfile.writeFile(pathToCollection, collectionData);
  return true
}

module.exports = {
  getCollection,
  saveCollection
}