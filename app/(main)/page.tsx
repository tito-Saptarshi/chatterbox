import { getOnboardedUserOrRedirect } from "@/lib/hooks/getOnboardedUser";
import { FriendsList } from "../components/FriendsList";
import { mockFriends, mockRecommended } from "@/lib/constants";
import { redirect } from "next/navigation";
import { FriendRender } from "../components/FriendRender";
import { getAllFriends } from "@/lib/hooks/getAllFriends";
import { RecommendedUsers } from "../components/RecommendedUsers";

export default async function Home() {
  const user = await getOnboardedUserOrRedirect();
  if (!user) {
    redirect("/onboarding");
  }

  const friends = await getAllFriends();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <FriendRender friends={friends} />
          <RecommendedUsers />
        </div>
        {/* <FriendsList
          friends={mockFriends}
          recommended={mockRecommended}
          searchQuery="hello"
        /> */}
      </main>
    </div>
  );
}
