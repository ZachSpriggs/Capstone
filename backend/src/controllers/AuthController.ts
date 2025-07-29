import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma';
import { signToken } from '../utils/jwt';

const SALT_ROUNDS = 10;

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are all required.' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered.' });
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
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const found = await prisma.user.findUnique({ where: { email } });
    if (!found) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, found.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
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
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
}
