import { FriendRequest, User } from "./types"

const mockFriends: User[] = [
  { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
]

const mockRecommended: User[] = [
  { id: "5", name: "Emma Brown", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  {
    id: "6",
    name: "Frank Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "1 day ago",
  },
  { id: "7", name: "Grace Lee", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
  { id: "13", name: "Oliver Chen", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
  {
    id: "14",
    name: "Sophie Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "3 hours ago",
  },
  { id: "15", name: "Marcus Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
]

const mockSentRequests: FriendRequest[] = [
  {
    id: "1",
    user: { id: "8", name: "Henry Taylor", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    user: { id: "9", name: "Ivy Chen", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
    timestamp: "1 day ago",
  },
]

const mockReceivedRequests: FriendRequest[] = [
  {
    id: "1",
    user: { id: "10", name: "Jack Robinson", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    timestamp: "30 minutes ago",
  },
  {
    id: "2",
    user: { id: "11", name: "Kate Anderson", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    timestamp: "3 hours ago",
  },
  {
    id: "3",
    user: { id: "12", name: "Liam Garcia", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
    timestamp: "5 hours ago",
  },
]
