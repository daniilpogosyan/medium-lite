import { Database } from 'sqlite3';
import * as path from 'path';

export function getDatabase() {
  const pathToDb = path.resolve(__dirname, 'database.db');
  const db = new Database(pathToDb, function(err) {
    if (err !== null) {
      throw err
    }
  })

  return db;
}

export type DocId = number;

export type Doc = {
  id: DocId;
  [key: string]: any;
}


// INITIALIZATION

const db = getDatabase();

const initSql = [
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT, authorID INTEGER)",
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, passwordHash TEXT)",
]

db.serialize(() => {
  initSql.forEach(sql => {
    db.run(sql, function(err) {
      if (err) {
        throw err
      }
    })
  })
})