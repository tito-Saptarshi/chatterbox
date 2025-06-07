import { StreamChat } from "stream-chat";

export type StreamUserData = {
  id: string;
  name?: string;
  image?: string;
  [key: string]: any; // allow extra fields if needed
};

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey!, apiSecret);

export const upsertStreamUser = async (userData: StreamUserData) => {
  try {
    await streamClient.upsertUsers([userData]);
    // upsertUsers --> create or update the user in Stream
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId: string) => {
  try {
    // ensure userId is a string
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
