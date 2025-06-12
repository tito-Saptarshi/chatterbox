import { Bell } from "lucide-react";



import { Badge } from "@/components/ui/badge";
import { getFriendsRequests } from "@/lib/hooks/getFriendsRequests";

import { FriendRequestList } from "@/app/components/FriendRequestList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  const filteredRequests = await getFriendsRequests();
  console.log("Filtered Requests: ", filteredRequests);
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-600" />
            <span>Friend Requests</span>
            <Badge variant="secondary">{filteredRequests.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FriendRequestList initialRequests={filteredRequests} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
