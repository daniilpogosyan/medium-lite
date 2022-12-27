import { getUser } from '../api';
import * as jwt from 'jsonwebtoken';

async function authorize(req, res, next) {
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
  
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(err) {
    res.status(401);
    return next(err);
  }

  const userId = decoded.id;
  const user = await getUser(userId);
  req.user = user;
  
  next();
}


export default authorize;