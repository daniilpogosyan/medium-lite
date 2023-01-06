import { posts } from "@prisma/client";
import prisma from "./prisma-client";

async function getUser(ID: posts['ID']) {
  const user = await prisma.users.findUnique({
    where: {ID}
  })

  return user
}

export default getUser;