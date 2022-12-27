import { getCollection } from "./utils";

async function getDoc(collectionName, id) {
  // TODO: use cache
  const collection = await getCollection(collectionName);
  if (collection[id] === undefined) {
    return null
  }

  return collection[id];
}

export default getDoc;