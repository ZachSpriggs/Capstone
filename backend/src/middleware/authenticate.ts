import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../utils/jwt';

export default function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId?: number };

    if (!decoded.userId) {
      console.log('Token missing userId');
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    req.userId = decoded.userId;
    console.log('✅ Authenticated user:', decoded.userId);
    next();
  } catch (err) {
    console.log('Token verification error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
