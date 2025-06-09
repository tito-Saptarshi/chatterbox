import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import User from "@/models/User";
import { connectDB } from "../db";

export async function getOnboardedUserOrRedirect() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  await connectDB();

  const dbUser = await User.findOne({ userId: user.id});
  
  console.log( "user.id " + user.id);
  console.log( "dbUser " + dbUser);
  

  if (!dbUser) {
    redirect("/onboarding");
  }

  if (!dbUser.isOnboarded) {
    redirect("/onboarding");
  }

  // If everything is OK, return dbUser or minimal data
  return dbUser;
}
