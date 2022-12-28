import { getCollection, saveCollection, addToIndex, Doc } from "./utils";
import * as uniqid from 'uniqid';

// ??? make sure that docData does bot include `id`
async function addDoc(docData: {}, collectionName: string) {
  // ??? redundant
  // if (doc.id === undefined) {
  //   doc.id = uniqid();
  // }
  const doc: Doc = {
    ...docData,
    id: uniqid(),
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
