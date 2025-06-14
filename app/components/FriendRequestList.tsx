"use client";

import { useState } from "react";
import { FriendRequestCard } from "./FriendRequestCard";

export function FriendRequestList({
  initialRequests,
}: {
  initialRequests: any[];
}) {
  const [requests, setRequests] = useState(initialRequests);

  const handleAccept = (userId: string) => {
    setRequests((prev) => prev.filter((req) => req.userId !== userId));
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No pending friend requests.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <FriendRequestCard
          key={request._id}
          userId={request.userId}
          username={request.username}
          profilePic={request.profilePic}
          timestamp={request.timestamp}
          onAccept={() => handleAccept(request.userId)}
        />
      ))}
    </div>
  );
}
