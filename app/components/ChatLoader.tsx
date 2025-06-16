// components/ChatLoader.tsx
import { Loader2 } from "lucide-react";

export default function ChatLoader() {
  return (
    <div className="flex justify-center items-center h-[93vh]">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="text-gray-600">Loading chat...</p>
      </div>
    </div>
  );
}
