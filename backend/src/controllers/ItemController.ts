// File: src/controllers/ItemController.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export class ItemController {
  /** GET /api/items */
  async getAll(req: Request, res: Response): Promise<void> {
    const items = await prisma.item.findMany({
      where: { userId: req.userId },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  }

  /** POST /api/items */
  async add(req: Request, res: Response): Promise<void> {
    const { name, categoryId, quantity = 1, notes } = req.body;

    if (!name || !categoryId) {
      res.status(400).json({ error: 'Missing name or categoryId' });
      return;
    }

    try {
      const item = await prisma.item.create({
        data: {
          name,
          quantity: Number(quantity),
          notes,
          categoryId,
          userId: req.userId!,
        },
        include: { category: true },
      });
      res.status(201).json(item);
    } catch (err) {
      console.error('Add item error:', err);
      res.status(500).json({ error: 'Failed to save item' });
    }
  }

  /** PUT /api/items/:id */
  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name, categoryId, quantity = 1, notes, dateRemoved } = req.body;

    if (!name || !categoryId) {
      res.status(400).json({ error: 'Missing name or categoryId' });
      return;
    }

    try {
      const updated = await prisma.item.update({
        where: { id },
        data: {
          name,
          quantity: Number(quantity),
          notes,
          categoryId,
          dateRemoved: dateRemoved ? new Date(dateRemoved) : undefined,
        },
        include: { category: true },
      });
      res.json(updated);
    } catch (err) {
      console.error('Update item error:', err);
      res.status(500).json({ error: 'Failed to update item' });
    }
  }

  /** DELETE /api/items/:id */
  async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      await prisma.item.delete({ where: { id } });
      res.sendStatus(204);
    } catch (err) {
      console.error('Delete item error:', err);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  }

  /** GET /api/items/search?q=term */
  async search(req: Request, res: Response): Promise<void> {
    const q = String(req.query.q || '');
    const results = await prisma.item.findMany({
      where: {
        userId: req.userId,
        OR: [
          { name: { contains: q } },
          { notes: { contains: q } },
        ],
      },
      include: { category: true },
    });
    res.json(results);
  }

  /** GET /api/items/report */
  async report(req: Request, res: Response): Promise<void> {
    const items = await prisma.item.findMany({
      where: { userId: req.userId },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });

    const header = 'Name,Category,Date Removed,Quantity,Notes';
    const rows = items.map(i =>
      [
        `"${i.name}"`,
        `"${i.category?.name || ''}"`,
        `"${i.dateRemoved.toISOString()}"`,
        i.quantity,
        `"${i.notes ?? ''}"`,
      ].join(',')
    );

    const csv = ['Decluttered Report', header, ...rows].join('\n');

    res
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="report.csv"')
      .send(csv);
  }
}
