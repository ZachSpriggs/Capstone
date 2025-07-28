import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma';

const SALT_ROUNDS = 10;
function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('JWT IS $$$$$$$$$$$$$$$$$$$$:', secret);
    throw new Error('Missing JWT_SECRET in environment');
  }
  return secret;
}

function signToken(userId: number): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '1h' });
}
export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Name, email, and password are all required.' });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409).json({ error: 'Email already registered.' });
    return;
  }

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const created = await prisma.user.create({
      data: { name, email, password: hash },
    });

    const token = signToken(created.id);

    res.status(201).json({
      token,
      user: {
        id: created.id,
        name: created.name,
        email: created.email,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    const match = await bcrypt.compare(password, found.password);
    if (!match) {
      res.status(401).json({ error: 'Invalid credentials.' });
      return;
    }

    const token = signToken(found.id);

    res.status(200).json({
      token,
      user: {
        id: found.id,
        name: found.name,
        email: found.email,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
}