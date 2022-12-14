const express = require('express');
const router = express.Router();
const api = require('../api');
const issueJWT = require('../auth/issueJWT');
const bcrypt = require('bcryptjs');

// create a new user
router.post('/signup', async (req, res, next) => {
  let user;
  try {
    user = await api.createUser(req.body.email, req.body.password);
  } catch(err) {
    return next(err);
  }

  const jwt = issueJWT({id: user.id});
  res.json(jwt);
});

// verify credentials and get a jwt 
router.post('/login', async (req, res, next) => {
  let user;
  user = await api.getUserByEmail(req.body.email);

  if(user === null
    || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const err = new Error('Wrong email or password');
    return next(err);
  }

  const jwt = issueJWT({id: user.id});
  res.json(jwt);
});

module.exports = router;
