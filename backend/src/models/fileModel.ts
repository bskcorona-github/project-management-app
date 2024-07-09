import mongoose, { Document, Schema } from 'mongoose';

interface IFile extends Document {
  filename: string;
  path: string;
  size: number;
  mimetype: string;
}

const FileSchema: Schema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
});

const File = mongoose.model<IFile>('File', FileSchema);

export default File;
