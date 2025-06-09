import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { UserPlus } from "lucide-react";

 const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
    }
  }

  export const RecommendedUserCard = ({
    user,
    onSendRequest,
    isSent,
  }: { user: User; onSendRequest: (id: string) => void; isSent: boolean }) => {
    // Mock descriptions for recommended users
    const descriptions = {
      "5": "Mutual friends with Alice and Bob. Loves photography and travel.",
      "6": "Works in tech, enjoys hiking and outdoor adventures.",
      "7": "Artist and designer, shares similar interests in creative projects.",
      "13": "Software engineer passionate about open source and gaming.",
      "14": "Marketing professional who loves books and coffee.",
      "15": "Fitness enthusiast and part-time photographer.",
    }

    return (
      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
            />
          </div>
          <div className="space-y-1">
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">
              {user.status === "online"
                ? "Online"
                : user.status === "away"
                  ? "Away"
                  : user.lastSeen
                    ? `Last seen ${user.lastSeen}`
                    : "Offline"}
            </p>
            <p className="text-xs text-gray-400 line-clamp-2">
              {descriptions[user.id as keyof typeof descriptions] || "New user on Chatterbox"}
            </p>
          </div>
          <Button
            size="sm"
            variant={isSent ? "secondary" : "outline"}
            onClick={() => onSendRequest(user.id)}
            disabled={isSent}
            className="w-full"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isSent ? "Sent" : "Add Friend"}
          </Button>
        </div>
      </div>
    )
  }