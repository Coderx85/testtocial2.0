export interface FormData {
  name: string;
  email: string;
  bio: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  bio: string;
  username: string;
  password: string;
}

export interface AuthUser {
  _id: string,
  appwriteID: string,
  name: string,
  username: string,
  bio: string,
  userPosts: [],
  likedPosts: [],
  createdAt?: Date,
  updatedAt?: Date,
  email: string;
  password: string;
}

export interface Post {
  createdAt: Date;
  _id?: string;
  author:  AuthUser;
  content: string;
  likes: string[];
  comments: string[];
  likesCount?: number;
  liked?: boolean;
  // file: Buffer;
}