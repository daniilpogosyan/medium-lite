import { posts } from '@prisma/client';
import prisma from './prisma-client';

import { getReadingTimeEstimate } from './utils';


async function getPost(ID: posts['ID']) {
  const post =  await prisma.posts.findUnique({
    select: {
      title: true,
      content: true,
      ID: true,
      author: true
    },
    where: {ID}
  });

  if (post === null) {
    return null
  }

  return {
    ...post,
    readingTimeEstimate: getReadingTimeEstimate(post.content.length)
  };
}

export default getPost;