import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import { connectDB } from "../db";

export async function getRecommendedUsers() {
  const user = await currentUser();

  if (!user) {
    return []; // Or handle as you like — maybe throw an error or redirect
  }

  await connectDB();

  // Find the current user in DB using userId (string)
  const dbUser = await User.findOne({ userId: user.id });

  if (!dbUser) {
    return []; // Or handle as you like — maybe throw an error or redirect
  }

  // Now fetch recommended users: 
  // - exclude current user
  // - exclude current user's friends
  // - only onboarded users

  const recommendedUsers = await User.find({
    userId: { $ne: user.id }, // exclude current user by userId
    _id: { $nin: dbUser.friends }, // exclude friends by _id
    isOnboarded: true,
  });

  return recommendedUsers; // Return it, no res.status here (function-style, like Code 2)
}
