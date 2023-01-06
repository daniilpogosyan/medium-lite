import { posts } from '@prisma/client';
import prisma from './prisma-client';
import { LeanPost } from './schemas';
import { getReadingTimeEstimate } from './utils';

async function createPost(postData: LeanPost) {
  const { title, content, authorID } = postData;
  const post = await prisma.posts.create({
    data: {
      title,
      content,
      authorID
    }
  }) as posts

  return {
    ...post,
    readingTimeEstimate: getReadingTimeEstimate(post.content.length)
  };
}

export default createPost