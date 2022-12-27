import * as jsonfile from 'jsonfile';
import * as path from 'path';

function getPathToCollection(name) {
  return path.resolve(__dirname, 'collections', `${name}.json`);
} 

function getPathToIndex(colName, prop) {
  return path.resolve(__dirname, 'indexes', `${colName}_${prop}.json`);
} 

export async function getIndex(colName, prop) {
  const pathToIndex = getPathToIndex(colName, prop);

  let index;
  try {
    index = await jsonfile.readFile(pathToIndex);
  } catch(err) {
    // if collection does not exist, then create a new one
    if (err.code === 'ENOENT') {
      await jsonfile.writeFile(pathToIndex, []);
      index = [];
    }
    // rethrow error otherwise
    else throw new Error('Unable to read the index');
  }

  return index
}


function getEntryFromIndex(index, propValue) {
  return index.find(entry => entry[0] === propValue);
}

export async function addToIndex(colName, prop, doc) {
  const index = await getIndex(colName, prop);

  const newEntry = [ doc[prop], doc.id ]
  index.push(newEntry);
  
  // a, b have structure: [propValue, [id1, id2...]]
  index.sort((a, b) => {
    if (a[0] > b[0]) return 1
    if (a[0] < b[0]) return -1
    return 0
  });

  await saveIndex(colName, prop, index);
}

async function saveIndex(colName, prop, index) {
  await jsonfile.writeFile(getPathToIndex(colName, prop), index);
}


export async function getCollection(name) {
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
    else throw new Error('Unable to read the collection');
  }

  return collection;
}

export async function saveCollection(collectionData, name) {
  const pathToCollection = getPathToCollection(name);
  // TODO: check if collectionData could be stored as json
  // *probably it could be solved with Typescript

  // IMPORTANT TODO: lock file when writing to it

  try {
    await jsonfile.writeFile(pathToCollection, collectionData);
  } catch(err) {
    throw new Error('Unable to write to the collection');
  }
  return true
}
