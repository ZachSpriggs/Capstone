import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateGoal } from '../middleware/validate';
import authenticate from '../middleware/authenticate';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  const userId = req.userId!;
  const goal = await prisma.goal.upsert({
    where: { userId },
    update: {},
    create: { userId, dailyGoal: 5 },
  });
  res.json(goal);
});

router.post('/', validateGoal, async (req: Request, res: Response) => {
  const userId = req.userId!;
  const { dailyGoal } = req.body;
  const goal = await prisma.goal.upsert({
    where: { userId },
    update: { dailyGoal },
    create: { userId, dailyGoal },
  });
  res.json(goal);
});

export default router;