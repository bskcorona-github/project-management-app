import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';
import fileRoutes from './routes/fileRoutes'; // ファイルルートを追加

// 環境変数を読み込み
dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/projects', projectRoutes);
app.use('/users', userRoutes);
app.use('/files', fileRoutes); // ファイルルートを追加

export default app;
