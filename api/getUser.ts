import getDoc from "../database/getDoc";
import { DocID } from "../database/utils";

async function getUser(ID: DocID) {
  const sql = `SELECT * FROM users WHERE ID=${ID}`;
  const user = await getDoc(sql);

  return user
}

export default getUser;