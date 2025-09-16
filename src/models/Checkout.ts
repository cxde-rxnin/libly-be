import mongoose, { Schema, Document } from 'mongoose';

export interface ICheckout extends Document {
  bookId: string;
  userId: string;
  checkoutDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'checked_out' | 'returned' | 'overdue';
  createdAt: Date;
  updatedAt: Date;
}

const CheckoutSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkoutDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['checked_out', 'returned', 'overdue'], default: 'checked_out' },
}, { timestamps: true });

export default mongoose.model<ICheckout>('Checkout', CheckoutSchema);
