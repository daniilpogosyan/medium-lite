import addDoc from '../database/addDoc';
import { getReadingTimeEstimate } from './utils';


async function createPost(postData, authorId) {
  const newPost = {
    title: postData.title,
    content: postData.content,
    author: authorId
  }

  const post = await addDoc(newPost, 'posts');
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);

  return post
};

export default createPost