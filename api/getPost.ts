import getDoc from '../database/getDoc';
import { getReadingTimeEstimate } from './utils';

async function getPost(id: string) {
  const post = await getDoc('posts', id);
  if (post === null) {
    return null
  }
  
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

export default getPost;