import jwt from 'jsonwebtoken';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET is not set in environment');
    throw new Error('JWT_SECRET is required');
  }
  return secret;
}

export function signToken(userId: number): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '1h' });
}

export function verifyToken(token: string): { userId: number } {
  return jwt.verify(token, getJwtSecret()) as { userId: number };
}
