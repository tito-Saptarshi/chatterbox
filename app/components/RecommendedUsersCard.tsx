"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/types";

interface Props { user: IUser; }

export function RecommendedUserCard({ user }: Props) {
  return (
    <div className="flex items-center space-x-4 p-2">
      <Avatar className="w-12 h-12">
        <AvatarImage src={user.profilePic || "/placeholder.svg"} alt={user.username} />
        <AvatarFallback>
          {user.username.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-medium">{user.username}</p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {user.bio || "New to Chatterbox!"}
        </p>
      </div>
    </div>
  );
}
