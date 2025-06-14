import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connectDB } from "../db";
import User from "@/models/User";

export async function getAllFriends() {
  try {
    const { userId } = await auth();

    if (!userId) {
      redirect("/sign-in");
    }

    await connectDB();

    const allUsers = await User.findOne({ userId }).populate("friends");

    console.log("user.id " + userId);
    console.log("allUsers ---> Friends" + allUsers);

    const cleanRequests = JSON.parse(JSON.stringify(allUsers.friends));

    return cleanRequests;
  } catch (error) {
    console.error("Error in getAllFriends server action", error);
  }
}
