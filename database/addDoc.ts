import { getCollection, saveCollection, addToIndex } from "./utils";
import * as uniqid from 'uniqid';

async function addDoc(doc, collectionName) {
  if (doc.id === undefined) {
    doc.id = uniqid();
  }
  const collection = await getCollection(collectionName);
  collection[doc.id] = doc;
  
  try {
    await saveCollection(collection, collectionName);
    await addToIndex(collectionName, 'id', doc);
  } catch(err) {
    throw new Error('Failed to write a document')
  }
  
  return doc;
}


export default addDoc;
