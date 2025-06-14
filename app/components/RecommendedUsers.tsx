import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { getRecommendedUsers } from "@/lib/hooks/getRecommendedUsers";
import { RecommendedUserCard } from "./RecommendedUsersCard";
import { getOnboardedUserOrRedirect } from "@/lib/hooks/getOnboardedUser";

export async function RecommendedUsers() {
  const users = await getRecommendedUsers();
  const loggedInUser = await getOnboardedUserOrRedirect();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="text-purple-600" />
          <span>Recommended for You</span>
          <Badge variant="secondary">{users.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.length === 0 ? (
          <p className="text-gray-500">No recommendations yet.</p>
        ) : (
          users.map((u) => (
            <div
              key={u.userId}
              className="border p-4 rounded-lg hover:bg-gray-50 transition"
            >
              <RecommendedUserCard user={u} loggedInUser={loggedInUser}/>
              {/* <FriendRequestButton sendUserId={u.userId} /> */}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
