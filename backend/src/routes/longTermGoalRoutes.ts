import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateLongTermGoal } from '../middleware/validate';
import authenticate from '../middleware/authenticate';

const prisma = new PrismaClient();
const router = Router();

// All routes require authentication
router.use(authenticate);

// GET all long-term goals
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const goals = await prisma.longTermGoal.findMany({
    where: { userId: req.userId! },
    include: { category: true },
  });
  res.json(goals);
});

// POST create new goal
router.post('/', validateLongTermGoal, async (req: Request, res: Response): Promise<void> => {
  const { description, targetCount, categoryId } = req.body;

  const goal = await prisma.longTermGoal.create({
    data: {
      userId: req.userId!,
      description,
      targetCount,
      categoryId,
    },
    include: { category: true },
  });

  res.status(201).json(goal);
});

// DELETE goal by ID
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  const goal = await prisma.longTermGoal.findFirst({
    where: {
      id,
      userId: req.userId!,
    },
  });

  if (!goal) {
    res.status(404).json({ error: 'Goal not found' });
    return;
  }

  await prisma.longTermGoal.delete({ where: { id } });
  res.json({ message: 'Goal deleted' });
});

export default router;
