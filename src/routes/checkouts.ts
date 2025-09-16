import { Router } from 'express';
const router = Router();
import { authenticateJWT } from '../middleware/auth';
import { checkoutBook, returnBook, getOverdueCheckouts, sendOverdueEmails } from '../controllers/checkoutController';
const { body } = require('express-validator');
import { validate } from '../middleware/validation';

// Protect all checkout routes with JWT authentication middleware
router.use(authenticateJWT);

// Checkout routes
router.post('/',
  [
    body('bookId').notEmpty(),
    body('userId').notEmpty()
  ],
  validate,
  checkoutBook
);
router.put('/:id/return', returnBook);
router.get('/overdue', getOverdueCheckouts);
router.post('/send-overdue-emails', sendOverdueEmails);

export default router;
