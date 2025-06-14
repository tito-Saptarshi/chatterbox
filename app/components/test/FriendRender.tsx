"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Users } from "lucide-react";
import { RecommendedUserCard } from "../RecommendedUsersCard";
import { Badge } from "@/components/ui/badge";
import { FriendUserCard } from "./FriendUserCard";

export function FriendRender({ friends }: { friends: any[] }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>My Friends</span>
            <Badge variant="secondary">{friends.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length === 0 ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No friends yet
              </h3>
              <p className="text-gray-500 mb-4">
                {"searchQuery"
                  ? "No friends found matching your search."
                  : "Start connecting with people by sending friend requests!"}
              </p>
              {!"searchQuery" && (
                <p className="text-sm text-gray-400">
                  Check out the recommended users below to get started.
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend) => 
                <FriendUserCard key={friend._id} user={friend} />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
