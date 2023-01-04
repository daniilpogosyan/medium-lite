import addDoc from '../database/addDoc';
import { LeanPost } from './schemas';
import { getReadingTimeEstimate } from './utils';


async function createPost(postData: LeanPost) {
  const { title, content, authorId: authorID } = postData;
  const sql = `INSERT INTO posts (title, content, authorID) VALUES('${title}', '${content}', '${authorID}')`
  const post = await addDoc(sql);
  if (post !== null) {
    // ??? post.readingTimeEstimate should be number, not any
    post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  }

  return post
};

export default createPost