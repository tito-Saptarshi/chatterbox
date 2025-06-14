import { FriendRender } from "@/app/components/test/FriendRender";
import { getAllFriends } from "@/lib/hooks/getAllFriends";
import React from "react";

export default async function Page() {
  const friends = await getAllFriends();

  return (
    <main className="container mx-auto px-4 py-6">
      <FriendRender friends={friends} />
    </main>
  );
}
