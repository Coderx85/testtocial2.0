import { IUser } from '@/types/modal';
import { Schema, model, models } from 'mongoose';

const UserSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  appwriteID: {
    type: String,
    required: [true, "Appwrite ID is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  userPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  },
  likedPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Post',
    default: [],
  }, 
}, {
  timestamps: true,
})

const User = models.User || model<IUser>("User", UserSchema);

export default User;