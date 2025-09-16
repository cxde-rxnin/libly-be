import { Router } from 'express';
const router = Router();
import { authenticateJWT } from '../middleware/auth';
import { addBook, updateBook, deleteBook, getBooks } from '../controllers/bookController';
const { body } = require('express-validator');
import { validate } from '../middleware/validation';

router.use(authenticateJWT);

router.get('/', getBooks);
router.post('/',
  [
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('isbn').notEmpty(),
    body('category').notEmpty(),
    body('totalCopies').isInt({ min: 1 }),
    body('availableCopies').isInt({ min: 0 })
  ],
  validate,
  addBook
);
router.put('/:id',
  [
    body('title').optional().notEmpty(),
    body('author').optional().notEmpty(),
    body('isbn').optional().notEmpty(),
    body('category').optional().notEmpty(),
    body('totalCopies').optional().isInt({ min: 1 }),
    body('availableCopies').optional().isInt({ min: 0 })
  ],
  validate,
  updateBook
);
router.delete('/:id', deleteBook);

export default router;
