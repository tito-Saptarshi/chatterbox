import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { RecommendedUserCard } from "./RecommendedUsersCard";


export function RecommendedUsers() {
      const [sentRequests, setSentRequests] = useState<Set<string>>(new Set())
    
      const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
      const filteredRecommended = recommended.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
      const handleSendRequest = (userId: string) => {
        setSentRequests((prev) => new Set(prev).add(userId))
      }
    
      const handleStartChat = (userId: string) => {
        console.log("Starting chat with user:", userId)
        // Implement chat functionality here
      }
    return (
        <div>
                <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <span>Recommended for You</span>
                        <Badge variant="secondary">{filteredRecommended.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredRecommended.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          {searchQuery ? "No recommended users found matching your search." : "No recommendations available."}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredRecommended.map((user) => (
                            <RecommendedUserCard
                              key={user.id}
                              user={user}
                              onSendRequest={handleSendRequest}
                              isSent={sentRequests.has(user.id)}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
        </div>
    )
}