import * as jsonfile from 'jsonfile';
import * as path from 'path';
import { isNodeError } from '../utils';

function getPathToCollection(name: string) {
  return path.resolve(__dirname, 'collections', `${name}.json`);
} 

function getPathToIndex(colName: string, prop: string) {
  return path.resolve(__dirname, 'indexes', `${colName}_${prop}.json`);
} 

export async function getIndex(colName: string, prop: string) {
  const pathToIndex = getPathToIndex(colName, prop);

  let index: Index;
  try {
    index = await jsonfile.readFile(pathToIndex);
  } catch(err) {
    // if collection does not exist, then create a new one
    if (isNodeError(err) && err.code === 'ENOENT') {
      await jsonfile.writeFile(pathToIndex, []);
      index = [];
    }
    // rethrow error otherwise
    else throw new Error('Unable to read the index');
  }

  return index
}


function getEntryFromIndex(index: Index, propValue: string) {
  return index.find(entry => entry[0] === propValue);
}


// ??? extend cocBase in function params (both type and interface)
// UNDONE
export async function addToIndex<T extends string>(colName: string, propName: T, doc: Doc & {[key in T]: any}) { 
  const index = await getIndex(colName, propName);

  const newEntry: IndexEntry = [doc[propName], doc.id];

  index.push(newEntry);
  
  // a, b have structure: [propValue, [id1, id2...]]
  index.sort((a, b) => {
    if (a[0] > b[0]) return 1
    if (a[0] < b[0]) return -1
    return 0
  });

  await saveIndex(colName, propName, index);
}

async function saveIndex(colName: string, prop: string, index: Index) {
  await jsonfile.writeFile(getPathToIndex(colName, prop), index);
}


export async function getCollection(name: string) {
  const pathToCollection = getPathToCollection(name);

  let collection: Collection;

  try {
    collection = await jsonfile.readFile(pathToCollection);
  } catch(err) {
    // if collection does not exist, then create a new one
    if (isNodeError(err) && err.code === 'ENOENT') {
      await jsonfile.writeFile(pathToCollection, {});
      collection = {};
    }
    // rethrow error otherwise
    else throw new Error('Unable to read the collection');
  }

  return collection;
}

export async function saveCollection(collectionData: Collection, name: string) {
  const pathToCollection = getPathToCollection(name);

  // IMPORTANT TODO: lock file when writing to it

  try {
    await jsonfile.writeFile(pathToCollection, collectionData);
  } catch(err) {
    throw new Error('Unable to write to the collection');
  }
  return true
}


type IndexEntry = [prop: any, id: DocId];
type Index = IndexEntry[];
export type DocId = string;

export type Doc = {
  id: DocId;
  [key: string]: any;
}

export type Collection = {
  [id: DocId]: Doc
}