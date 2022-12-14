const express = require('express');
const router = express.Router();

const accountRouter = require('./account');
const postRouter = require('./posts')

// get a list of posts
router.get('/', (req, res, next) => {

});


// get a specific post
router.get('/:postId', (req, res, next) => {
  
});

// verify jwt and create a new post
router.post('/', (req, res, next) => {
  //TODO: validate form data
  
});


module.exports = router;
