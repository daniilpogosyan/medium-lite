import * as express from 'express';
import * as api from '../api';
import { createPost } from '../api';
import authorize from '../auth/authorize';
import { body, validationResult } from 'express-validator';
import { Doc } from '../database/utils';
import { isPositiveInteger } from '../utils';

const router = express.Router();

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

  const postId = +req.params.postId;
  if (!isPositiveInteger(postId)) {
    const err = new Error('Invalid ID. ID must be a positive integer');
    res.status(400)
    return next(err)
  }

  try {
    post = await api.getPost(postId);
  } catch(err) {
    return next(err);
  }

  if (post === null) {
    res.status(404);
    const err = new Error('Post not found');
    return next(err);
  }
  res.json(post);
});

// verify jwt and create a new post
router.post('/', authorize,
  createPostValidator(),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const aggregateError = new AggregateError(
        errors.array().map((err) => new Error(err.msg)),
        'Invalid input'
      );
      res.status(400);
      return next(aggregateError);
    }

    if (req.user === undefined) {
      const err = new Error('Invalid user or token');
      res.status(401);
      return next(err);
    }
    
    const postData = {
      title: req.body.title,
      content: req.body.content,
      authorId: req.user.id
    }

    let post: Doc;
    try {
      post = await createPost(postData);
    } catch(err) {
      return next(err);
    }

    res.json(post);
  }
);


export default router;