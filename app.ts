import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as dotenv from 'dotenv';

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

// ??? overload. do I NEED to specify types here?
// /??? Can't it just look at the number of params and figure that it is express.ErrorRequestHandler
// error handler
app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json({message: err.message || "Error"});
});

export default app;
