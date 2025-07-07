import jwt, { JwtPayload } from 'jsonwebtoken';
import { H3Event, createError } from 'h3';

interface AuthPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyToken = (event: H3Event) => {
  const authHeader = event.node.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as AuthPayload;
    return decoded;
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized - Invalid token' });
  }
};
