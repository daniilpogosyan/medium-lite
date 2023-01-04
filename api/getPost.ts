import getDoc from '../database/getDoc';
import { DocId } from '../database/utils';
import { getReadingTimeEstimate } from './utils';

async function getPost(id: DocId) {
  let sql = `SELECT * FROM posts WHERE id=${id}`;
  const post = await getDoc(sql);
  if (post === null) {
    return null
  }
  
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

export default getPost;