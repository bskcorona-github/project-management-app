import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: string };

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.redirect('/login');
        return;
      }

      next();
    } catch (error) {
      console.error(error);
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
});

export { protect };
