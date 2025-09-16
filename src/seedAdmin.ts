import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Librarian from './models/Librarian';
import connectDB from './utils/database';

const seedAdmin = async () => {
  await connectDB();
  const username = process.env.ADMIN_USERNAME || 'admin';
  const email = process.env.ADMIN_EMAIL || 'admin@library.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await Librarian.findOne({ username });
  if (existing) {
    console.log('Admin librarian already exists.');
    process.exit(0);
  }
  await Librarian.create({ username, email, passwordHash });
  console.log('Admin librarian seeded:', { username, email });
  process.exit(0);
};

seedAdmin();
