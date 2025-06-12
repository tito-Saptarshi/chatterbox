"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";

import { toast } from "sonner";
import { acceptRequest } from "../actions/user.actions";

export function FriendRequestCard({
  userId,
  username,
  profilePic,
  timestamp,
  onAccept,
}: {
  userId: string;
  username: string;
  profilePic: string;
  timestamp: string;
  onAccept?: () => void;
}) {
  const [accepted, setAccepted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAccept = () => {
    startTransition(async () => {
      const result = await acceptRequest({}, userId);
      if (result.status === "SUCCESS") {
        toast.success("Friend request accepted");
        setAccepted(true);
        onAccept?.();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePic || "/placeholder.svg"} alt={username} />
          <AvatarFallback>
            {username.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900">{username}</h3>
          <p className="text-sm text-gray-500">Sent {timestamp}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          disabled={accepted || isPending}
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="h-4 w-4 mr-1" />
          {accepted ? "Accepted" : isPending ? "Accepting..." : "Accept"}
        </Button>
        {!accepted && (
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Decline
          </Button>
        )}
      </div>
    </div>
  );
}
