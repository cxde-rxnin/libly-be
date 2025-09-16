import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Librarian from '../models/Librarian';

// Handles librarian authentication
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const librarian = await Librarian.findOne({ username });
    if (!librarian) {
      console.error('Login error: Librarian not found', { username });
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, librarian.passwordHash);
    if (!isMatch) {
      console.error('Login error: Password mismatch', { username });
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: librarian._id, username: librarian.username },
      process.env.JWT_SECRET || '',
      { expiresIn: '8h' }
    );
    res.json({ token, librarian: { id: librarian._id, username: librarian.username, email: librarian.email } });
  } catch (error) {
    console.error('Login server error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
