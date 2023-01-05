import getDoc from "./getDoc";
import { Doc, getDatabase } from "./utils";

// TODO: handle errors EVERYWHERE 
// TODO: generalize build*Query()


async function addDoc(sqlForSet: string) {
  const db = getDatabase();

  const doc: Promise<Doc> = new Promise(function(resolve, reject) {
    db.run(sqlForSet, function(err) {
      if (err) {
        return reject(err);
      }

      // regex: positive lookbehind doesn't work properly
      // const updatedTable = sqlForSet.match(/(?<=(^INSERT INTO ))\w+/).;

      // I could use just split on the whole sql, but in this case long TEXT values 
      // would also be split in a large array, that doesn't seem good solution in terms of performance
      const match = sqlForSet.match(/^INSERT INTO \w+/);
      if (match === null)
        throw new Error("Query doesn't include substring 'INSERT INTO table_name'")
      const updatedTable = match[0].split(' ')[2];

      const sqlForGet = `SELECT * FROM ${updatedTable} WHERE ID=${this.lastID}`;
      getDoc(sqlForGet)
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
