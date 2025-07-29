import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateItem = [
  body('name').notEmpty().withMessage('Name is required'),
  body('categoryId').isInt({ gt: 0 }).withMessage('Valid category ID is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be 1 or more'),
  handleValidationErrors,
];


export const validateGoal = [
  body('dailyGoal').isInt({ min: 1 }).withMessage('Daily goal must be a number'),
  handleValidationErrors,
];

export const validateLongTermGoal = [
  body('description').notEmpty().withMessage('Description required'),
  body('targetCount').isInt({ min: 1 }).withMessage('Target count required'),
  body('categoryId').isInt({ gt: 0 }).withMessage('Valid category ID required'),
  handleValidationErrors,
];

export const validateCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
  handleValidationErrors,
];

export function validateAuth(req: Request, res: Response, next: NextFunction): void {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  next();
}