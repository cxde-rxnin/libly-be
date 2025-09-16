import { Request, Response } from 'express';
import Checkout from '../models/Checkout';
import Book from '../models/Book';
import User from '../models/User';
import emailService from '../services/emailService';

const DUE_DAYS = 14;

export const checkoutBook = async (req: Request, res: Response) => {
  try {
    const { bookId, userId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies < 1) {
      return res.status(400).json({ message: 'Book not available' });
    }
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + DUE_DAYS);
    const checkout = await Checkout.create({
      bookId,
      userId,
      checkoutDate: new Date(),
      dueDate,
      status: 'checked_out'
    });
    book.availableCopies -= 1;
    await book.save();
    res.status(201).json(checkout);
  } catch (error) {
    res.status(400).json({ message: 'Error checking out book', error });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout || checkout.status !== 'checked_out') {
      return res.status(400).json({ message: 'Invalid checkout' });
    }
    checkout.status = 'returned';
    checkout.returnDate = new Date();
    await checkout.save();
    const book = await Book.findById(checkout.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }
    res.json(checkout);
  } catch (error) {
    res.status(400).json({ message: 'Error returning book', error });
  }
};

export const getOverdueCheckouts = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const overdue = await Checkout.find({
      dueDate: { $lt: now },
      status: 'checked_out'
    }).populate('userId').populate('bookId');
    res.json(overdue);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overdue checkouts', error });
  }
};

export const sendOverdueEmails = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const overdue = await Checkout.find({
      dueDate: { $lt: now },
      status: 'checked_out'
    }).populate('userId').populate('bookId');
    let sent = 0;
    for (const checkout of overdue) {
      const user = checkout.userId as any;
      const book = checkout.bookId as any;
      await emailService.sendOverdueEmail(user.email, user.name, book.title, checkout.dueDate);
      sent++;
    }
    res.json({ sent });
  } catch (error) {
    res.status(500).json({ message: 'Error sending overdue emails', error });
  }
};

export const getAllCheckouts = async (req: Request, res: Response) => {
  try {
    const checkouts = await Checkout.find().populate('userId').populate('bookId');
    res.json(checkouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching checkouts', error });
  }
};
