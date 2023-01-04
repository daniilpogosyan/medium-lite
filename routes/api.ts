import accountRouter from './account';
import postsRouter from './posts';
import usersRouter from './users';

import * as express from 'express';
import { isAggregateError } from '../utils';

const router = express.Router();

router.use('/account', accountRouter);

router.use('/posts', postsRouter);

router.use('/users', usersRouter);

router.use(function(req, res, next) {
  const err = new Error('Not found');
  res.status(404);
  next(err);
});

router.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // AggregateError are created in request body validators
  if (isAggregateError(err)) {
    const errors = err.errors.map(error => {
      return {
        message: error.message
      }
    });

    // if res got to error-handler but somehow still have code 200
    return res.json(errors)
  } 

  if (res.statusCode === 200) {
    return res.status(500);
  }

  if (req.app.get('env') == 'development') {
    console.error(err);
    return res.json({
      name: err.name,
      message: err.message,
      stack: err.stack
    });
  } else {
    return res.json({message: err.message || "Error"});
  }
});

export default router;
