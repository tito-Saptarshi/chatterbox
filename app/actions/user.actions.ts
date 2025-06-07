"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { upsertStreamUser } from "@/lib/stream";

export const onboarding = async (prevState: any, formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      ...prevState,
      error: "No logged in user found",
      status: "ERROR",
    };
  }

  const user = await currentUser();

  try {
    // Connect to DB
    await connectDB();

    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const profilePic = formData.get("profilePic") as string;
    const location = formData.get("location") as string;

    if (!user) {
      return {
        ...prevState,
        error: "Logged in user not found",
        status: "ERROR",
      };
    }

    const email = user.emailAddresses[0].emailAddress;
    if (!email) {
      return {
        ...prevState,
        error: "Unable to fetch Email",
        status: "ERROR",
      };
    }

    // Optional: validation (basic example)
    if (!fullName || !username || !profilePic || !location) {
      return {
        ...prevState,
        error: "Required fields are missing",
        status: "ERROR",
      };
    }

    // Check if user already exists
    let dbUser = await User.findOne({ email });

    if (dbUser) {
      // User exists → update it
      dbUser.userId = "n fgjbdflkgdfgdfg";
      dbUser.fullName = fullName;
      dbUser.username = username;
      dbUser.bio = bio;
      dbUser.profilePic = profilePic;
      dbUser.location = location;
      dbUser.isOnboarded = true;

      await dbUser.save();

      console.log(`Existing user updated in DB: ${dbUser.fullName}`);

      // Update in Stream
      try {
        await upsertStreamUser({
          id: dbUser._id.toString(),
          name: dbUser.username,
          image: dbUser.profilePic || "",
        });
        console.log(`Stream user updated for existing user ${dbUser.fullName}`);
      } catch (streamError: any) {
        console.log(
          "Error updating Stream user for existing user:",
          streamError.message
        );
      }

      return {
        ...prevState,
        status: "SUCCESS",
        userId: dbUser._id.toString(),
      };
    } else {
      // User does not exist → create it
      const newUser = await User.create({
        userId : "n fgjbdflkgdfgdfg",
        fullName,
        username,
        email,
        bio,
        profilePic,
        location,
        isOnboarded: true,
      });

      console.log(`New user created in DB: ${newUser.fullName}`);

      // Create/Update Stream user
      try {
        await upsertStreamUser({
          id: newUser._id.toString(),
          name: newUser.username,
          image: newUser.profilePic || "",
        });
        console.log(`Stream user created for new user ${newUser.fullName}`);
      } catch (streamError: any) {
        console.log(
          "Error creating Stream user for new user:",
          streamError.message
        );
      }

      return {
        ...prevState,
        status: "SUCCESS",
        userId: newUser._id.toString(),
      };
    }
  } catch (error) {
    console.error("Error during onboarding:", error);

    return {
      ...prevState,
      error: "An unexpected error occurred",
      status: "ERROR",
    };
  }
};
