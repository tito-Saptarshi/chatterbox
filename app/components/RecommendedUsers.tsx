import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { RecommendedUserCard } from "./RecommendedUsersCard";
import { IUser } from "@/lib/types";
import { getRecommendedUsers } from "@/lib/hooks/getRecommendedUsers";

export async function RecommendedUsers(user: IUser) {
  // const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  // const filteredFriends = friends.filter((friend) =>
  //   friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const filteredRecommended = recommended.filter((user) =>
  //   user.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleSendRequest = () => {
    // setSentRequests((prev) => new Set(prev).add(userId));
  };

  // const handleStartChat = (userId: string) => {
  //   console.log("Starting chat with user:", userId);
  //   // Implement chat functionality here
  // };


  const recommendedUsers = await getRecommendedUsers(user.userId);
  console.log("Recommended Users: ", recommendedUsers);
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>Recommended for You</span>
            <Badge variant="secondary">{recommendedUsers.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendedUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {"searchQuery"
                ? "No recommended users found matching your search."
                : "No recommendations available."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedUsers.map((user: IUser) => (
                <RecommendedUserCard
                  key={user.userId}
                  user={user}
                  // onSendRequest={handleSendRequest}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
