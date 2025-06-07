"use server"

import { useUser } from '@clerk/nextjs';


import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const onboarding = async (
  prevState: any,
  formData: FormData
) => {
  try {
    // Connect to DB
    await connectDB();

    // Extract form fields
    const fullName = formData.get('fullName') as string;
    const username = formData.get('username') as string;
    const bio = formData.get('bio') as string;
    const profilePic = formData.get('profilePic') as string;
    const location = formData.get('location') as string;

  const { user } = useUser();

  if(!user) {
     return {
        ...prevState,
        error: 'Logged in user not found',
        status: 'ERROR',
      };
  } 

  const email = user.emailAddresses[0].emailAddress;

  if(!email) {
     return {
        ...prevState,
        error: 'unable to fetch Email',
        status: 'ERROR',
      };
  } 

    // Optional: validation (basic example)
    if (!fullName || !username || !profilePic || !location ) {
      return {
        ...prevState,
        error: 'Required fields are missing',
        status: 'ERROR',
      };
    }



    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        ...prevState,
        error: 'Email already registered',
        status: 'ERROR',
      };
    }

    // Create new user
    const newUser = await User.create({
      fullName,
      username,
      email,
      bio,
      profilePic,
      location,
      isOnboarded: true
    });

    return {
      ...prevState,
      status: 'SUCCESS',
      userId: newUser._id.toString(),
    };
  } catch (error) {
    console.error('Error uploading user:', error);

    return {
      ...prevState,
      error: 'An unexpected error occurred',
      status: 'ERROR',
    };
  }
};