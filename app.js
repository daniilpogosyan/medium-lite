import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config()

import apiRouter from './routes/api';

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

export default app;
