import getDoc from "./getDoc";
import { Doc, getDatabase } from "./utils";

// TODO: handle errors EVERYWHERE 
// TODO: generalize build*Query()

function buildInsertQuery(docData: {}, table: string) {
  const columnsArray = [];
  const valuesArray = [];

  for (const [column, value] of Object.entries(docData)) {
    columnsArray.push(column);

    if (typeof value === 'string') {
      valuesArray.push(`'${value}'`)
    } else if (typeof value === 'number') {
      valuesArray.push(value)
    }
  }

  const values = '(' + valuesArray.join(', ') + ')';
  const columns = '(' + columnsArray.join(', ') + ')';
  const query = `INSERT INTO ${table} ${columns} VALUES${values}`;
  return query;
}


async function addDoc(docData: {}, collectionName: string) {
  const db = getDatabase();

  const doc: Promise<Doc> = new Promise(function(resolve, reject) {
    const insertSql = buildInsertQuery(docData, collectionName);
    db.run(insertSql, function(err) {
      if (err) {
        return reject(err);
      }
      
      const sql = `SELECT * FROM ${collectionName} WHERE id=${this.lastID}`;
      getDoc(sql)
      .then((newDoc) => {
        if (newDoc === null) {
          return reject(new Error('Unable to add doc'));
        }
        resolve(newDoc)
      })
    });
  })

  // TODO: close db
  return doc
}

export default addDoc;
