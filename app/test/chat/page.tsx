
import { ChatComponent } from "@/app/components/test/ChatComponent";
import { getChatUser } from "@/lib/hooks/getChatUser";
import { generateStreamToken } from "@/lib/stream";


export default async function Page() {

   const user = await getChatUser();
   
     const streamToken = generateStreamToken(user._id.toString());
     console.log("streamToken test : ", streamToken);
     
 return (
  <main>
    <ChatComponent streamToken={streamToken} user={user}/>
  </main>
 )
};

