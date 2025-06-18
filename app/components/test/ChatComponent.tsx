"use client"

import { IUser } from '@/lib/types';
import { useState, useEffect } from 'react';
import type { User, Channel as StreamChannel } from 'stream-chat';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = '8wu5wsn9bmst';
const userId = 'winter-cloud-1';
const userName = 'winter';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg0NmZlNWVjOTFiMTFlMmUxNjI2ZjVjIn0.zSyN72DFqfBaDRgrB-ceY8r7WybTn6HuZmnPML45xtU';




export function ChatComponent({streamToken, user} : { streamToken : string; user: IUser}) {

  const newUser: User = {
  id: user._id.toString(),
  name: user.username
}; 
console.log("ChatComponent newUser : ", newUser);

 const [channel, setChannel] = useState<StreamChannel>();
   const client = useCreateChatClient({
     apiKey,
     tokenOrProvider: userToken,
     userData: newUser,
   });

    console.log("ChatComponent client : ", client);
 
   useEffect(() => {
     if (!client) return;
 
     const channel = client.channel('messaging', 'custom_channel_id', {
       image: 'https://getstream.io/random_png/?name=react',
       name: 'Talk about React',
       members: [user._id],
     });
 
     setChannel(channel);
   }, [client]);
 
   if (!client) return <div>Setting up client & connection...</div>;
 
   return (
     <Chat client={client}>
       <Channel channel={channel}>
         <Window>
           <ChannelHeader />
           <MessageList />
           <MessageInput />
         </Window>
         <Thread />
       </Channel>
     </Chat>
   );
}
