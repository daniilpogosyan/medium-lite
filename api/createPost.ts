import addDoc from '../database/addDoc';
import { LeanPost } from './schemas';
import { getReadingTimeEstimate } from './utils';


async function createPost(postData: LeanPost) {
  const newPost = {
    title: postData.title,
    content: postData.content,
    author: postData.authorId
  }

  const post = await addDoc(newPost, 'posts');
  // ??? post.readingTimeEstimate should be number, not any
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);

  return post
};

export default createPost