import { Request, Response, NextFunction } from 'express';
const { validationResult } = require('express-validator');
// Request validation middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
