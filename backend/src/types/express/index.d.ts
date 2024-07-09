import { JwtPayload } from 'jsonwebtoken';
import { UserDocument } from '../../models/userModel';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserDocument & JwtPayload;
    file?: {
      filename: string;
      path: string;
      size: number;
      mimetype: string;
      bucketName?: string;
    };
    headers: any; // headers プロパティを追加
  }
}
