import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

router.post('/login', login);

// TODO: Add auth endpoints

export default router;
