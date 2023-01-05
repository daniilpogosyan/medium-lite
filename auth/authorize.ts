import { getUser } from '../api';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../api/schemas';
import { DocID } from '../database/utils';

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
    throw new Error('Cannot verify jwt due to internal error. Secret is missing');
  }

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  } catch(err) {
    res.status(401);
    return next(err);
  }

  const userID: DocID = decoded.ID;
  const user = await getUser(userID) as User;
  if (user === null) {
    const err = new Error('User with this ID does not exist');
    res.status(401);
    return next(err);
  }
  req.user = user;
  
  next();
}


export default authorize;