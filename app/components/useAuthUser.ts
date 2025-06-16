// hooks/useAuthUser.ts
import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export default function useAuthUser() {
  const { user, isLoaded } = useUser();

  const authUser = useMemo(() => {
    if (!isLoaded || !user) return null;

    console.log("authuser :", authUser);

    return {
      _id: user.id,
      fullName: user.fullName || user.username || "Anonymous",
      profilePic: user.imageUrl,
      email: user.primaryEmailAddress?.emailAddress,
    };
  }, [user, isLoaded]);
  console.log("authuser and isloaded :", authUser, " + ", isLoaded);
  return { authUser, isLoaded };
}
