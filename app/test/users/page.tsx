import { RecommendedUsers } from "@/app/components/RecommendedUsers";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  return (
    <div>
      <RecommendedUsers user={user} />
    </div>
  );
};

export default Page;
