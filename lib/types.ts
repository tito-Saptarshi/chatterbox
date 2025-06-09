export type FriendRequest = {
  id: string
  user: User
  timestamp: string
}

export type User = {
  userId: string
  fullName: string
  username: string
  email: string
  bio: string
  profilePic: string
  location: string
  isOnboarded: boolean
  friends: string[]
  sentRequests: string[]  
  receivedRequests: string[]
}

export type CurrentUser = {
  id: string
  name: string
  username: string
  bio: string
  avatar: string
}