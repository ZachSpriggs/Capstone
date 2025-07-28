import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function initializeDatabase() {
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (err) {
    console.error('Prisma init error:', err);
    throw err;
  }
}