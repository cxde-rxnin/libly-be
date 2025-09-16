// Shared types

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Checkout {
  id: string;
  bookId: string;
  userId: string;
  checkoutDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'checked_out' | 'returned' | 'overdue';
  createdAt: Date;
  updatedAt: Date;
}

export interface Librarian {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
