import getDoc from "../database/getDoc";
import { DocId } from "../database/utils";

async function getUser(id: DocId) {
  const sql = `SELECT * FROM users WHERE id=${id}`;
  const user = await getDoc(sql);

  return user
}

export default getUser;