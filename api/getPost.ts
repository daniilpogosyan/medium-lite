import getDoc from '../database/getDoc';
import { getReadingTimeEstimate } from './utils';

async function getPost(id) {
  const post = await getDoc('posts', id);
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

export default getPost;