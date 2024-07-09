import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('MONGODB_URI in connectDB:', process.env.MONGODB_URI); // 追加
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // 追加
      useFindAndModify: false, // 追加
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
