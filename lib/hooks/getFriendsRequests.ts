import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import User from "@/models/User";
import { connectDB } from "../db";

export async function getFriendsRequests() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  await connectDB();

  const allUsers = await User.find({ userId: user.id }).populate(
    "receivedRequests"
  );

  console.log("user.id " + user.id);
  console.log("allUsers " + allUsers);

  // If everything is OK, return dbUser or minimal data
  return allUsers;
}
