
import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { validateCategoryInput } from '../utils/validation';

export class CategoryController {
  async getAll(req: Request, res: Response): Promise<void> {
    const cats = await prisma.category.findMany();
    res.json(cats);
  }

  async add(req: Request, res: Response): Promise<void> {
    if (!validateCategoryInput(req.body)) {
      res.status(400).json({ error: 'Invalid category input' });
      return;
    }
    const { name } = req.body;
    const created = await prisma.category.create({ data: { name } });
    res.status(201).json(created);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name } = req.body;
    const updated = await prisma.category.update({ where: { id }, data: { name } });
    res.json(updated);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await prisma.category.delete({ where: { id } });
    res.sendStatus(204);
  }
}
