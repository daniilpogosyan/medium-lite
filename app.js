var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

const apiRouter = require('./routes/api');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  res.status(404);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json({message: err.message || "Error"});
});

module.exports = app;
