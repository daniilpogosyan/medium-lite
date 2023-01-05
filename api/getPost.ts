import getDoc from '../database/getDoc';
import { DocID } from '../database/utils';
import { getReadingTimeEstimate } from './utils';



async function getPost(ID: DocID) {
  const columns = "post.content, posts.title, posts.id as postID, posts.authorID, users.email";
  let sql = `SELECT ${columns} jOIN users ON users.id=posts.authorID FROM posts WHERE ID=${ID}`;
  const post = await getDoc(sql);
  if (post === null) {
    return null
  }
  
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

export default getPost;