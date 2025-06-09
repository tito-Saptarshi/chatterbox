export type FriendRequest = {
  id: string
  user: User
  timestamp: string
}

export type User = {
  userId: string
  fullName: string
  username: string
  email: string
  bio: string
  profilePic: string
  location: string
  isOnboarded: boolean
  friends: string[]
  sentRequests: string[]  
  receivedRequests: string[]
}

export type CurrentUser = {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
}

// types/user.ts
import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  userId: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
  profilePic?: string;
  location?: string;
  isOnboarded: boolean;
  friends: Types.ObjectId[];
  sentRequests: Types.ObjectId[];
  receivedRequests: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
