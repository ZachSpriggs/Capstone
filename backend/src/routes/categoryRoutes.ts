import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateCategory } from '../middleware/validate';
import authenticate from '../middleware/authenticate';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.use(authenticate);

router.get('/', async (_req, res) => {
  const cats = await prisma.category.findMany({ orderBy: { name: 'asc' } });
  res.json(cats);
});

router.post('/', validateCategory, async (req: Request, res: Response) => {
  const { name } = req.body;
  const cat = await prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
  res.status(201).json(cat);
});

export default router;