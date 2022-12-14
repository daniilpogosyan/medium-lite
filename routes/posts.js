const express = require('express');
const router = express.Router();

const api = require('../api');

const accountRouter = require('./account');
const postRouter = require('./posts')

// get a list of posts
router.get('/', async (req, res, next) => {
  const posts = await api.getPosts();
  res.json(posts);
});


// get a specific post
router.get('/:postId', async (req, res, next) => {
  const post = await api.getPost(req.params.postId);
  res.json(post);
});

// verify jwt and create a new post
router.post('/', async (req, res, next) => {
  //TODO: validate form data
  
  
});


module.exports = router;
