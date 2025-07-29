import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import authRoutes from './routes/auth';
import costumeRoutes from './routes/costumes';
import orderRoutes from './routes/orders';
import favoriteRoutes from './routes/favorites';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form data için

// CORS ayarları - DÜZELTME 1
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/costumes', costumeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoriteRoutes); // DÜZELTME 2: /favorites -> /api/favorites

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});