import * as express from 'express';
import { getUsers } from '../api';

var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let users;
  try {
    const options = {
      page: req.query.page ? +req.query.page : undefined,
      limit: req.query.limit ? +req.query.limit : undefined,
      includePosts: (req.query.includePosts === 'true')
    }
    users = await getUsers(options);
  } catch(err) {
    return next(err);
  }

  res.json(users);
});

export default router
