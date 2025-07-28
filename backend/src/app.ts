import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import itemRoutes from './routes/itemRoutes';
import categoryRoutes from './routes/categoryRoutes';
import goalRoutes from './routes/goalRoutes';
import longTermGoalRoutes from './routes/longTermGoalRoutes';
import authenticate from './middleware/authenticate';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', authenticate, itemRoutes);
app.use('/api/categories', authenticate, categoryRoutes);
app.use('/api/goals', authenticate, goalRoutes);
app.use('/api/long-term-goals', authenticate, longTermGoalRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

export default app;
