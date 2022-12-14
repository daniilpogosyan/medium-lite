const { getCollection, saveCollection } = require("./utils");
const uniqid = require('uniqid');

async function addDoc(doc, collectionName) {
  if (doc.id === undefined) {
    doc.id = uniqid();
  }
  const collection = await getCollection(collectionName);
  collection[doc.id] = doc;
  
  try {
    await saveCollection(collection, collectionName)
  } catch(err) {
    throw new Error('Failed to write a document')
  }
  
  return doc;
}

module.exports = addDoc;
