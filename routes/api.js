const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const postRouter = require('./posts')

router.use('/account', accountRouter);

router.use('/posts', postRouter);

router.use((err, req, res, next) => {
  res.json({message: err.message});
});

module.exports = router;
