const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const postRouter = require('./posts')

router.use('/account', accountRouter);

router.use('/posts', postRouter);

router.use(function(req, res, next) {
  const err = new Error('Not found');
  res.status(404);
  next(err);
});

router.use((err, req, res, next) => {
  // AggregateError are created in request body validators
  if (err.name === 'AggregateError') {
    const errors = err.errors.map(error => {
      return {
        message: error.message
      }
    });

    // if res got to error-handler but somehow still have code 200
    if (res.statusCode === 200) {
      res.status(500);
    }
    return res.json(errors)
  } 

  res.json({message: err.message});
});

module.exports = router;
