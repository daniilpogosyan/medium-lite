import { Doc, DocId, getDatabase } from "./utils";

async function getDoc(sql: string){
  const db = getDatabase();

  // ??? cant doc use inference to set type as Promise<Doc>
  const doc: Promise<Doc | null> = new Promise(function(resolve, reject) {
    db.get(sql, function(err, row) {
      if (err) {
        return reject(err)
      }
      resolve(row || null)
    })
    // TODO: close db
  })

  return doc
}

export default getDoc;