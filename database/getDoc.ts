import { DocId, getCollection } from "./utils";

async function getDoc(collectionName: string, id: DocId) {
  // TODO: use cache
  const collection = await getCollection(collectionName);
  if (collection[id] === undefined) {
    return null
  }

  return collection[id];
}

export default getDoc;