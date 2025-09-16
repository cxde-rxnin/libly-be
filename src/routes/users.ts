import { Router } from 'express';
const router = Router();
import { authenticateJWT } from '../middleware/auth';
import { addUser, updateUser, getUsers, getUserHistory } from '../controllers/userController';
const { body } = require('express-validator');
import { validate } from '../middleware/validation';

router.use(authenticateJWT);

router.get('/', getUsers);
router.post('/',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('phone').notEmpty(),
    body('membershipId').notEmpty()
  ],
  validate,
  addUser
);
router.put('/:id',
  [
    body('name').optional().notEmpty(),
    body('email').optional().isEmail(),
    body('phone').optional().notEmpty(),
    body('membershipId').optional().notEmpty()
  ],
  validate,
  updateUser
);
router.get('/:id/history', getUserHistory);

export default router;
