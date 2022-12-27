import express from 'express';
import * as api from '../api';
import { createPost } from '../api';
import authorize from '../auth/authorize';


const router = express.Router();

const { body, validationResult } = require('express-validator');

const createPostValidator = () => ([
  body('title').trim().escape()
 .isLength({max: 100, min: 10})
 .withMessage('Post title length must be between 10 and 100 characters'),
  body('content').trim().escape()
  .isLength({max: 5000, min: 100})
  .withMessage('Post content length must be between 100 and 5000 characters')
]);

// get a list of posts
router.get('/', async (req, res, next) => {
  let posts;
  try {
    const options = {
      excludeContent: !req.query.excludeContent,
      page: req.query.page ? +req.query.page : undefined,
      limit: req.query.limit ? +req.query.limit : undefined
    }
    posts = await api.getPosts(options);
  } catch(err){
    return next(err) ;
  }

  res.json(posts);
});


// get a specific post
router.get('/:postId', async (req, res, next) => {
  let post;
  try {
    post = await api.getPost(req.params.postId);
  } catch(err) {
    return next(err);
  }

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
      res.status(400);
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


export default router;