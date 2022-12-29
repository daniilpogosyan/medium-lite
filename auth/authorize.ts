import { getUser } from '../api';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../api/schemas';

async function authorize(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.header('Authorization');
  if (bearerToken === undefined) {
    const err = new Error('Authorization header is missing');
    res.status(401);
    return next(err);
  }
  
  // assume that bearerToken is in the form:
  // 'Bearer {token}'
  const token = bearerToken.split(' ')[1];
  let decoded;
  
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('Cannot verify jwt due to internal error');
  }

  try {
    if (process.env.JWT_SECRET === undefined) {
      const err = new Error('Unable to verify jwt due to internal error: secret is missing');
      res.status(500);
      return next(err)
    }
    decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  } catch(err) {
    res.status(401);
    return next(err);
  }

  const userId = decoded.id;
  const user = await getUser(userId) as User;
  if (user === null) {
    const err = new Error('User with this id does not exist');
    res.status(401);
    return next(err);
  }
  req.user = user;
  
  next();
}


export default authorize;