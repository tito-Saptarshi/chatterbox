"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import User from "@/models/User";
import { connectDB } from "../db";

export async function getFriendsRequests() {
   const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();

  const allUsers = await User.findOne({ userId }).populate(
    "receivedRequests"
  );

  console.log("user.id " + userId);
  console.log("allUsers " + allUsers);

  // If everything is OK, return dbUser or minimal data
  return allUsers.receivedRequests;
}
