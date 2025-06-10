
import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { RecommendedUsers } from "@/app/components/RecommendedUsers";

export default async function Page() {
  const user = await currentUser();
  if(!user) redirect("/sign-in");
  await connectDB();

  const currentUserDoc = await User.findOne({ userId: user.id });
  if (!currentUserDoc) return <p>User not found in DB.</p>;

  return (
    <main className="p-4">
      <RecommendedUsers user={currentUserDoc} />
    </main>
  );
}