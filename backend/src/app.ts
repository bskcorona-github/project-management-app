import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import wikiRoutes from './routes/wikiRoutes';

// 環境変数を読み込み
dotenv.config({ path: '../.env' });
console.log('MONGODB_URI from dotenv:', process.env.MONGODB_URI); // デバッグ用

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/wiki', wikiRoutes); // Wikiルートを追加

export default app;
