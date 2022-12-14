const express = require('express');
const router = express.Router();

const api = require('../api');
const { createPost } = require('../api');
const authorize = require('../auth/authorize')

const accountRouter = require('./account');
const postRouter = require('./posts')

const { body, validationResult } = require('express-validator');

const createPostValidator = () => ([
  body('title').trim().escape()
 .isLength({max: 100, min: 10}),
  body('content').trim().escape()
  .isLength({max: 5000, min: 100})
]);

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
router.post('/', authorize,
  createPostValidator(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const aggregateError = new AggregateError(
        errors.array().map((err) => new Error(err.msg)),
        'Invalid input'
      );
      
      return next(aggregateError);
    }

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
  }
);


module.exports = router;
