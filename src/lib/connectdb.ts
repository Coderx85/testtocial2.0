import mongoose from 'mongoose';

let isConnected = false;
const mongooseUri = process.env.NEXT_PUBLIC_ENV_MONGODB_URI as string;

export const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  try {
    await mongoose.connect(mongooseUri);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error: any) {
    console.error('Error connecting to MongoDB: \n', mongoose.Error);
  }
}