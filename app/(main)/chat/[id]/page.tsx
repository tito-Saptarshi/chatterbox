import ChatClientPage from "@/app/components/chat/ChatClientPage";
import { getChatUser } from "@/lib/hooks/getChatUser";
import { generateStreamToken } from "@/lib/stream";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  const { id } = await  params;

  if (!userId) {
    // If the user is not authenticated, you can redirect or return an error
    return redirect("/");
  }

  const user = await getChatUser();

  const streamToken = generateStreamToken(userId);

  console.log("streamToken : " , streamToken);
  console.log("params.id : " , id);
  console.log("user : " , user);

  return <ChatClientPage targetUserId={id} streamToken={streamToken!} user={user}/>;
}
