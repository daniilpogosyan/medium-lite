var express = require('express');
const { getUsers } = require('../api');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let users;
  try {
    const options = {
      startId: req.query.startId,
      limit: req.query.limit ? +req.query.limit : undefined
    }
    users = await getUsers(options);
  } catch(err) {
    return next(err);
  }

  res.json(users);
});

module.exports = router;
