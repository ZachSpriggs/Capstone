// File: src/controllers/BaseController.ts
import { Request, Response } from 'express';
import { prisma } from '../prisma';

export abstract class BaseController<T> {
  protected prisma = prisma;
  protected abstract modelName: keyof typeof prisma;

  /** GET /api/[model] */
  public async getAll(_req: Request, res: Response): Promise<void> {
    const records: T[] = await this.prisma[this.modelName].findMany();
    res.json(records);
  }

  /** DELETE /api/[model]/:id */
  public async remove(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    await this.prisma[this.modelName].delete({ where: { id } });
    res.sendStatus(204);
  }
}
