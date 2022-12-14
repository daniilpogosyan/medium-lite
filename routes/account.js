const express = require('express');
const router = express.Router();
const api = require('../api');
const issueJWT = require('../auth/issueJWT');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');


const createCredentialsValidator = () => ([
  body('email', 'Email should have structure: mymail@example.com')
  .isEmail(),
  body('password', 'Password is not strong enough').isStrongPassword()
])

// create a new user
router.post('/signup',
  createCredentialsValidator(),
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

    let user;
    try {
      user = await api.createUser(req.body.email, req.body.password);
    } catch(err) {
      return next(err);
    }

    const jwt = issueJWT({id: user.id});
    res.json(jwt);
  }
);

// verify credentials and get a jwt 
router.post('/login', async (req, res, next) => {
  let user;
  try {
    user = await api.getUserByEmail(req.body.email);
  } catch(err) {
    return next(err);
  }

  if(user === null
    || !bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const err = new Error('Wrong email or password');
    res.status(401);
    return next(err);
  }

  const jwt = issueJWT({id: user.id});
  res.json(jwt);
});

module.exports = router;
