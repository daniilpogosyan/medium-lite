import getDoc from "../database/getDoc";
import { DocId } from "../database/utils";

async function getUser(id: DocId) {
  const user = await getDoc('users', id);
  return user
}

export default getUser;