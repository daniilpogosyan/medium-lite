var express = require('express');
const { getUsers } = require('../api');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let users;
  try {
    users = await getUsers();
  } catch(err) {
    return next(err);
  }

  res.json(users);
});

module.exports = router;
