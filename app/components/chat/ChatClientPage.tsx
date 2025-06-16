"use client";

import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import ChatLoader from "../ChatLoader";
import CallButton from "../CallButton";
import { IUser } from "@/lib/types";



const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;

export default function ChatClientPage({ targetUserId, streamToken, user }: { targetUserId: string, streamToken: string, user: IUser }) {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const initChat = async () => {
      
      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: user._id,
            name: user.fullName,
            image: user.profilePic,
          },
          streamToken
        );

        console.log("Connected to Stream Chat as:", user.fullName);
        

        const channelId = [user._id, targetUserId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [user._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (err) {
        console.error("Chat init error:", err);
        toast.error("Failed to connect to chat.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [streamToken, user, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;
    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });
    toast.success("Video call link sent!");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
