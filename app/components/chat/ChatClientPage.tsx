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
  useCreateChatClient,
} from "stream-chat-react";
import ChatLoader from "../ChatLoader";
import CallButton from "../CallButton";
import { IUser } from "@/lib/types";
import type { User, Channel as StreamChannel } from "stream-chat";
import { generateStreamToken } from "@/lib/stream";

const STREAM_API_KEY = process.env.STEAM_API_KEY!;
console.log("STREAM_API_KEY : ", STREAM_API_KEY);

export default function ChatClientPage({
  targetUserId,
  streamToken,
  user,
}: {
  targetUserId: string;
  streamToken: string;
  user: IUser;
}) {
  const userNew: User = {
    id: user._id.toString(),
    name: user.username,
    image: user.profilePic || "",
  };

  console.log("ChatClientPage userNew : ", userNew);

  const client = useCreateChatClient({
    apiKey: "8wu5wsn9bmst",
    tokenOrProvider: streamToken,
    userData: userNew,
  });
  console.log("ChatClientPage client : ", client);
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!client) return;
    const channelId = [user._id, targetUserId].sort().join("-");
    const channel = client.channel("messaging", channelId, {
      members: [user._id, targetUserId],
    });
    console.log("ChatClientPage channel : ", channel);
    setChannel(channel);
  }, [client, targetUserId, user._id]);

  const handleVideoCall = () => {
    if (!channel) return;
    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `I've started a video call. Join me here: ${callUrl}`,
    });
    toast.success("Video call link sent!");
  };

  // if (!client) return <div>Setting up client & connection...</div>;
  if (!client || loading || !chatClient || !channel) return <ChatLoader />;

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
