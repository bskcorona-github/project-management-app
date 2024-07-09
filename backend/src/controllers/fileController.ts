import { Request, Response } from 'express';
import { GridFSBucket, ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const conn = mongoose.connection;

const uploadFile = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const file = req.file as Express.Multer.File & { id?: string; bucketName?: string; };

  res.status(201).json({
    file: {
      id: file.id,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      bucketName: file.bucketName,
    },
  });
};

const getFile = async (req: Request, res: Response) => {
  const fileID = new ObjectId(req.params.id);

  try {
    const bucket = new GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    const downloadStream = bucket.openDownloadStream(fileID);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.sendStatus(404);
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching file' });
  }
};

const deleteFile = async (req: Request, res: Response) => {
  const fileID = new ObjectId(req.params.id);

  try {
    const bucket = new GridFSBucket(conn.db, {
      bucketName: 'uploads',
    });

    await bucket.delete(fileID);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Error deleting file' });
  }
};

export { uploadFile, getFile, deleteFile };
