import { Doc, DocId, getDatabase } from "./utils";

function buildSelectQuery(table: string, id: DocId) {
  const query = `SELECT * FROM ${table} WHERE id=${id}`;
  return query;
}

async function getDoc(collectionName: string, id: DocId){
  const db = getDatabase();

  // ??? cant doc use inference to set type as Promise<Doc>
  const doc: Promise<Doc | null> = new Promise(function(resolve, reject) {
    const sql = buildSelectQuery(collectionName, id);
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