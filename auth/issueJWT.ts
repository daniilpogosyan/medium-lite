import * as jwt from 'jsonwebtoken';

function issueJWT(payload: jwt.JwtPayload) {
  const options: jwt.SignOptions = {
    expiresIn: '3d',
    algorithm: 'HS256'
  };

  if (process.env.JWT_SECRET === undefined)
    return null
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}


export default issueJWT;