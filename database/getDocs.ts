import { isPositiveInteger } from "../utils";
import { Doc, getDatabase } from "./utils";

type Opts = {
  exclude?: string[],
  page?: number,
  limit?: number
}


// test this approach of excluding columns:
// https://stackoverflow.com/questions/729197/exclude-a-column-using-select-except-columna-from-tablea
// and compare performance with removing unwanted columns in js

function buildSelectQuery(table: string, options: Opts) {
  // TODO: exclude fields
  // TODO: handle invalid limit and page

  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  const query = `SELECT * FROM ${table} LIMIT ${limit} OFFSET ${offset}`;
  return query;
}

// TODO: use options
async function getDocs(collectionName: string, options: Opts): Promise<Doc[]> {
  const db = getDatabase();

  const docs: Promise<Doc[]> = new Promise(function(resolve, reject) {
    const selectSql = buildSelectQuery(collectionName, options);
    console.time('excluding')
    db.all(selectSql, function(err, rows) {
      if (err) reject(err)
      // TODO: exclude fields (see above)
      
      if (options.exclude) {
        console.time('remove column')
        rows.forEach(row => {
          options.exclude?.forEach(unwantedColumn => delete row[unwantedColumn])
        })
        console.timeEnd('remove column')
      }
      console.timeEnd('excluding')
      resolve(rows)
    });
  });

  // TODO: close db
  return docs;
}

export default getDocs;