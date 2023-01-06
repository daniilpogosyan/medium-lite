import prisma from "./prisma-client";


async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {email}
  });

  return user;
}

export default getUserByEmail;