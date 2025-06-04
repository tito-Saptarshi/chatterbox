export type FriendRequest = {
  id: string
  user: User
  timestamp: string
}

export type User = {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
  lastSeen?: string
}