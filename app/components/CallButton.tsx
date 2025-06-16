// components/CallButton.tsx
import { Video } from "lucide-react";

interface Props {
  handleVideoCall: () => void;
}

export default function CallButton({ handleVideoCall }: Props) {
  return (
    <button
      onClick={handleVideoCall}
      className="absolute top-4 right-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md z-10"
    >
      <Video size={18} />
      Start Call
    </button>
  );
}
