import mongoose, { Schema, Document } from 'mongoose';

export interface ILibrarian extends Document {
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const LibrarianSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<ILibrarian>('Librarian', LibrarianSchema);
