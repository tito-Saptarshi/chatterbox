import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { IUser } from "../types";
import mongoose from "mongoose";

export async function getRecommendedUsers(userId: string): Promise<IUser[]> {
  await connectDB();

  // Get current user including _id and friends
  const currentUser = await User.findOne({ userId })
    .select("_id friends")
    .lean<{ _id: mongoose.Types.ObjectId; friends: mongoose.Types.ObjectId[] } | null>();
  
  if (!currentUser) return [];

  // Create safe exclusion list
  const excludedIds: mongoose.Types.ObjectId[] = [
    ...(currentUser.friends || []), 
    currentUser._id
  ];

  const recommendedUsers = await User.find({
    _id: { $nin: excludedIds },
    isOnboarded: true
  }).lean<IUser[]>();

  return recommendedUsers;
}