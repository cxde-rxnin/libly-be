import { Request, Response } from 'express';
import User from '../models/User';
import Checkout from '../models/Checkout';

export const addUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error adding user', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserHistory = async (req: Request, res: Response) => {
  try {
    const history = await Checkout.find({ userId: req.params.id }).populate('bookId');
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user history', error });
  }
};
