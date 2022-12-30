import addDoc from '../database/addDoc';
import { LeanPost } from './schemas';
import { getReadingTimeEstimate } from './utils';


async function createPost(postData: LeanPost) {
  const newPost = {
    title: postData.title,
    content: postData.content,
    authorID: postData.authorId
  }

  const post = await addDoc(newPost, 'posts');
  if (post !== null) {
    // ??? post.readingTimeEstimate should be number, not any
    post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  }

  return post
};

export default createPost


// const postSample = {
//   title: 'sample popst',
//   content: "TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running oudasd qsdqa t TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out  l is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running ouunning out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out  l is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running ouunning out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out  l is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running ouunning out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out  l is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running ouunning out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out  l is running out TIME is rTIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running o out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out TIME is running out",
//   authorId: 1
// }

// for(let i = 0; i < 5000; i++) {
//   createPost(postSample);
// }