import getDoc from '../database/getDoc';
import { DocID } from '../database/utils';
import { getReadingTimeEstimate } from './utils';



async function getPost(ID: DocID) {
  let sql = `SELECT () FROM posts WHERE ID=${ID}`;
  const post = await getDoc(sql);
  if (post === null) {
    return null
  }
  
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

export default getPost;