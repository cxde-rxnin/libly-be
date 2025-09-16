import { Request, Response } from 'express';
import Book from '../models/Book';

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error adding book', error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Error updating book', error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '', category } = req.query;
    const query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    const books = await Book.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit);
    const total = await Book.countDocuments(query);
    res.json({ books, total });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};
