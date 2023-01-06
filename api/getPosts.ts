import prisma from "./prisma-client";
import { isPositiveInteger } from "../utils";

type Opts = {
  userID?: number;
  limit?: number;
  page?: number;
  excludeContent?: boolean
}

async function getPosts(options: Opts = { excludeContent: true }) {
  const limit = isPositiveInteger(options.limit)
  ? options.limit
  : 10;

  const offset = isPositiveInteger(options.limit) && isPositiveInteger(options.page)
  ? options.limit * (options.page - 1)
  : 0;

  const posts = await prisma.posts.findMany({
    skip: offset,
    take: limit,
    select: {
      title: true,
      content: options.excludeContent ? false : true,
      author: true,
      ID: true
    },
    where: {
      ...(options.userID !== undefined ? {authorID: options.userID} : {})
    }
  })

  return posts
}

export default getPosts;