import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  username: string;
  bio: string;
  userPosts: Schema.Types.ObjectId[];
  likedPosts: Schema.Types.ObjectId[];
}
