import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import User from "@/models/User";
import { connectDB } from "../db";

export async function getChatUser() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();

  const dbUser = await User.findOne({ userId });
  
  console.log( "user.id " + userId);
  console.log( "dbUser " + dbUser);
  

  if (!dbUser) {
    redirect("/onboarding");
  }

  if (!dbUser.isOnboarded) {
    redirect("/onboarding");
  }

const cleanRequests = JSON.parse(JSON.stringify(dbUser.receivedRequests));

  // If everything is OK, return dbUser or minimal data
  return cleanRequests;
}
