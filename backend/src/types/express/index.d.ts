import { JwtPayload } from 'jsonwebtoken';
import { UserDocument } from '../../models/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserDocument & JwtPayload;
  }
}
