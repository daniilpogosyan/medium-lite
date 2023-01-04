import { Doc, getDatabase } from "./utils";


// TODO: use options
async function getDocs(sql: string): Promise<Doc[]> {
  const db = getDatabase();

  const docs: Promise<Doc[]> = new Promise(function(resolve, reject) {
    db.all(sql, function(err, rows) {
      if (err) {
        reject(err)
      }
      resolve(rows)
    });
  });

  // TODO: close db
  return docs;
}

export default getDocs;