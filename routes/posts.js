const express = require('express');
const router = express.Router();

const api = require('../api');
const { createPost } = require('../api');
const authorize = require('../auth/authorize')

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
router.post('/', authorize, async (req, res, next) => {
  //TODO: validate form data

  const postData = {
    title: req.body.title,
    content: req.body.content,
  }

  let post;
  try {
    post = await createPost(postData, req.user.id);
  } catch(err) {
    return next(err);
  }

  res.json(post);
});


module.exports = router;
