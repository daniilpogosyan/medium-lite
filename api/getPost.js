const getDoc = require("../database/getDoc");
const { getReadingTimeEstimate } = require('./utils');

async function getPost(id) {
  const post = await getDoc('posts', id);
  // TODO: define readingTimeEstimate as virtual property
  post.readingTimeEstimate = getReadingTimeEstimate(post.content.length);
  return post
}

module.exports = getPost;