const bcrypt = require('bcryptjs');
const addDoc = require('../database/addDoc');


async function createPost(postData, authorId) {
  const post = {
    title: postData.title,
    content: postData.content,
    author: authorId
  }

  addDoc(post, 'posts');
};

module.exports = createPost;