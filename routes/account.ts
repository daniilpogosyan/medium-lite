import * as express from 'express';
import issueJWT from '../auth/issueJWT';
import * as bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import * as api from '../api';
import { isNodeError } from '../utils';

const router = express.Router();

const createCredentialsValidator = () => ([
  body('email', 'Email should have structure: mymail@example.com')
  .isEmail(),
  body('password', 'Password is not strong enough').isStrongPassword()
])

// create a new user
router.post('/signup',
  createCredentialsValidator(),
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

    let user;
    try {
      user = await api.createUser(req.body.email, req.body.password);
    } catch(err) {
      if (isNodeError(err) && err.name === 'EmailInUse') {
        res.status(400)
      }
      return next(err);
    }

    const jwt = issueJWT({ID: user.ID});
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

  if (typeof req.body.password !== 'string') {
    const err = new Error('Password must be a string');
    res.status(400);
    return next(err)
  }

  if(user === null
    || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    const err = new Error('Wrong email or password');
    res.status(401);
    return next(err);
  }

  const jwt = issueJWT({ID: user.ID});
  res.json(jwt);
});


export default router;