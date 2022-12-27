import { getCollection } from "./utils";

async function query(collectionName, options) {
  const collection = await getCollection(collectionName);

  for (const doc of Object.values(collection)) {
    if(docMeetsQuery(doc, options)) {
      return doc
    }
  }

  return null;
}

function docMeetsQuery(doc, options) {
  for (const [param, value] of Object.entries(options)) {
    if (doc[param] !== value) {
      return false;
    }
  }

  return true;
}

export default query