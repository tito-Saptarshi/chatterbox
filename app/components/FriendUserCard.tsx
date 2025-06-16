import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function FriendUserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user.profilePic || "/placeholder.svg"}
              alt={user.username}
            />
            <AvatarFallback>
              {user.username
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="font-medium ">{user.username}</h3>
          {/* <p className="text-sm text-gray-500">
            {user.status === "online"
              ? "Online"
              : user.status === "away"
                ? "Away"
                : user.lastSeen
                  ? `Last seen ${user.lastSeen}`
                  : "Offline"}
          </p> */}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Link href={`/chat/${user.userId}`}>
          <Button
            size="sm"
            onClick={() => {}}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
        </Link>
      </div>
    </div>
  );
}
