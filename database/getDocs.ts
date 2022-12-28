import { Doc, getCollection } from "./utils";

type Opts = {
  exclude?: string[],
  page?: number,
  limit?: number
}


async function getDocs(collectionName: string, { exclude, page = 1, limit = 10 }: Opts) {
  // TODO: use cache
  const collection = await getCollection(collectionName);
  
  let docs;
  docs = Object.values(collection).slice((page - 1) * limit, page * limit)

  // fitler excluded props
  if (Array.isArray(exclude)) {
    docs = docs.map(doc => {
      return Object.fromEntries(
        Object.entries(doc)
        .filter(entry => !exclude.includes(entry[0]))
      )
    })
  }
  

  // TODO: add pagination
  return docs
}

export default getDocs;