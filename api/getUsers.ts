import prisma from './prisma-client';
import { isPositiveInteger } from '../utils';

export type Opts = {
  limit?: number,
  page?: number
  includePosts?: boolean
}

async function getUsers(options: Opts) {
  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  const users = await prisma.users.findMany({
    skip: offset,
    take: limit,
    include: {
      posts: (options.includePosts? true: false)
    }
  });

  return users
}

export default getUsers;