import { Doc, getDatabase } from "./utils";



function buildSelectQuery(table: string, options: {}) {
  const conditionsArray: string[] = [];
 
  for (const [column, value] of Object.entries(options)) {
    if (typeof value === 'string') {
      conditionsArray.push(`${column}='${value}'`)
    } else if (typeof value === 'number') {
      conditionsArray.push(`${column}=${value}`)
    }
  }

  const conditions = conditionsArray.join(' AND ');
  const query = `SELECT * FROM ${table} WHERE ${conditions}`
  return query
}

function query(collectionName: string, options: {}) {
  const db = getDatabase();

  const doc: Promise<Doc | null> = new Promise(function(resolve, reject) {
    const selectSql = buildSelectQuery(collectionName, options)
    db.get(selectSql, function(err, row) {
      if (err) reject(err)
      resolve(row || null)
    })
  });

  return doc;
}

export default query