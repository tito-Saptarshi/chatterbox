"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { upsertStreamUser } from "@/lib/stream";
import FriendRequest from "@/models/FriendRequest";

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
    const dbUser = await User.findOne({ email });

    if (dbUser) {
      // User exists → update it
      dbUser.userId = user.id;
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
        userId: user.id,
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

// export const sentRequest = async (prevState: any, sendUserId: string) => {
//   try {
//     const { userId } = await auth();

//     if (!userId) {
//       return {
//         ...prevState,
//         error: "No logged in user found",
//         status: "ERROR",
//         type: "None",
//       };
//     }

//     if (userId === sendUserId) {
//       return {
//         ...prevState,
//         error: "You cannot send a friend request to yourself",
//         status: "ERROR",
//         type: "None",
//       };
//     }

//     await connectDB();

//     const sendUser = await User.findOne({ userId: sendUserId });
//     if (!sendUser) {
//       return {
//         ...prevState,
//         error: "User not found",
//         status: "ERROR",
//         type: "None",
//       };
//     }

//     const currentUser = await User.findOne({ userId: userId });

//     const existingSentRequest = await FriendRequest.findOne({
//       sender: userId,
//       recipient: sendUserId,
//     });

//     if (existingSentRequest) {
//       return {
//         ...prevState,
//         error: "Friend request already sent",
//         status: "ERROR",
//         type: "Sent",
//       };
//     }

//     const existingReceivedRequest = await FriendRequest.findOne({
//       sender: userId,
//       recipient: sendUserId,
//     });

//     if (existingReceivedRequest) {
//       return {
//         ...prevState,
//         error: "Friend request yet to be accepted",
//         status: "ERROR",
//         type: "Received",
//       };
//     }

//     if (currentUser.friends.includes(sendUser._id)) {
//       return {
//         ...prevState,
//         error: "Already friends with this user",
//         status: "ERROR",
//         type: "friends",
//       };
//     }

//      const friendRequest = await FriendRequest.create({
//       sender: currentUser._id,
//       recipient: sendUser._id, 
//       senderUserId: currentUser.userId,
//       recipientUserId: sendUser.userId,     
//     });

//     return {
//       ...prevState, 
//       status: "SUCCESS",
//       type: "Sent", 
//     }

//   } catch (error) {
//     console.error("Error sending friend request:", error);

//     return {
//       ...prevState,
//       error: "An unexpected error occurred while sending the request",
//       status: "ERROR",
//     };
//   }
// };


export const sendRequest = async (prevState: any, receiverId: string) => {
  try {
    const { userId } = await auth();
    if (!userId) return { ...prevState, error: "Not logged in", status: "ERROR", type: "None" };
    if (userId === receiverId)
      return { ...prevState, error: "Cannot send to yourself", status: "ERROR", type: "None" };

    await connectDB();

    const target = await User.findOne({ userId: receiverId });
    if (!target) return { ...prevState, error: "User not found", status: "ERROR", type: "None" };

    const me = await User.findOne({ userId });

    const sent = await FriendRequest.findOne({ senderUserId: userId, recipientUserId: receiverId });
    if (sent)
      return { ...prevState, error: "Already sent", status: "ERROR", type: "Sent" };

    const rec = await FriendRequest.findOne({ senderUserId: receiverId, recipientUserId: userId });
    if (rec)
      return { ...prevState, error: "Request received", status: "ERROR", type: "Received" };

    if (me!.friends.includes(target!._id))
      return { ...prevState, error: "Already friends", status: "ERROR", type: "friends" };

    await FriendRequest.create({
      sender: me!._id,
      recipient: target!._id,
      senderUserId: userId,
      recipientUserId: receiverId,
    });

    return { ...prevState, status: "SUCCESS", type: "Sent" };

  } catch (err) {
    console.error(err);
    return { ...prevState, error: "Unexpected error", status: "ERROR", type: "None" };
  }
};