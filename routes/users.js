var express = require('express');
const { getUsers } = require('../api');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let users;
  try {
    const options = {
      page: req.query.page ? +req.query.page : undefined,
      limit: req.query.limit ? +req.query.limit : undefined
    }
    users = await getUsers(options);
  } catch(err) {
    return next(err);
  }

  res.json(users);
});

module.exports = router;
