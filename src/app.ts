// Express app bootstrap
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/database';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Route imports
import authRoutes from './routes/auth';
import bookRoutes from './routes/books';
import userRoutes from './routes/users';
import checkoutRoutes from './routes/checkouts';

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/checkouts', checkoutRoutes);

import { Request, Response } from 'express';

app.get('/', (req: Request, res: Response) => {
  res.send('Library Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
