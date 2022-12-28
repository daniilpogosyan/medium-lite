import getDoc from "../database/getDoc";

async function getUser(id: string) {
  const user = await getDoc('users', id);
  return user
}

export default getUser;