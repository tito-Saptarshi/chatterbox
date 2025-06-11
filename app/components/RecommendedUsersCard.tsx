import { IUser } from "@/lib/types";
import { FriendRequestButton } from "./FriendRequestButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  user: IUser;
  loggedInUser?: IUser;
}

export function RecommendedUserCard({ user, loggedInUser }: Props) {
  console.log("Rendering RecommendedUserCard for: ", user);
  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const loggedInUserId = loggedInUser?._id;

  let type = "None";
  if (user.sentRequests.includes(loggedInUserId!)) {
    type = "Received";
  } else if (user.receivedRequests.includes(loggedInUserId!)) {
    type = "Sent";
  } else if (user.friends.includes(loggedInUserId!)) {
    type = "friends";
  } else {
    type = "None";
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
      {/* Left Section: Avatar and Details */}
      <div className="flex items-center gap-4">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={user.profilePic || "/placeholder.svg"}
            alt={user.username}
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <p className="font-semibold text-base">{user.username}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 max-w-xs">
            {user.bio || "New to Chatterbox!"}
          </p>
          <p className="text-xs text-gray-500">
            📍 {user.location || "Location not set"}
          </p>
        </div>
      </div>

      {/* Right Section: Button */}
      <div className="sm:ml-auto w-full sm:w-auto">
        <FriendRequestButton sendUserId={user.userId} type={type} />
      </div>
    </div>
  );
}
