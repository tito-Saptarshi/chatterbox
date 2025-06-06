
import { FriendsList } from "../components/FriendsList";
import { mockFriends, mockRecommended } from "@/lib/constants";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <FriendsList
          friends={mockFriends}
          recommended={mockRecommended}
          searchQuery="hello"
        />
      </main>
    </div>
  );
}
