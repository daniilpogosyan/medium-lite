const bcrypt = require('bcryptjs');
const addDoc = require('../database/addDoc');
const { getReadingTimeEstimate } = require('./utils');


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

module.exports = createPost;