"use client"

import { useState } from "react"
import { MessageCircle, UserPlus, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/types"


interface FriendsListProps {
  friends: User[]
  recommended: User[]
  searchQuery: string
}

export function FriendsList({ friends, recommended, searchQuery }: FriendsListProps) {
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

  const UserCard = ({ user, isFriend = false }: { user: User; isFriend?: boolean }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`}
          />
        </div>
        <div>
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
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {isFriend ? (
          <Button size="sm" onClick={() => handleStartChat(user.id)} className="bg-blue-600 hover:bg-blue-700">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </Button>
        ) : (
          <Button
            size="sm"
            variant={sentRequests.has(user.id) ? "secondary" : "outline"}
            onClick={() => handleSendRequest(user.id)}
            disabled={sentRequests.has(user.id)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {sentRequests.has(user.id) ? "Sent" : "Add Friend"}
          </Button>
        )}
      </div>
    </div>
  )

  const RecommendedUserCard = ({
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

  return (
    <div className="space-y-6">
      {/* Friends Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>My Friends</span>
            <Badge variant="secondary">{filteredFriends.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFriends.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No friends yet</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? "No friends found matching your search."
                  : "Start connecting with people by sending friend requests!"}
              </p>
              {!searchQuery && (
                <p className="text-sm text-gray-400">Check out the recommended users below to get started.</p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFriends.map((friend) => (
                <UserCard key={friend.id} user={friend} isFriend={true} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommended Users Section */}
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
