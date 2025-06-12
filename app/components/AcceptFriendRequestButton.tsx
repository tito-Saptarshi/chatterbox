"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { acceptRequest } from "../actions/user.actions";

export function AcceptFriendRequestButton({
  senderUserId,
  onAccepted,
}: {
  senderUserId: string;
  onAccepted?: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [accepted, setAccepted] = useState(false);

  return (
    <Button
      size="sm"
      disabled={isPending || accepted}
      className={`bg-green-600 hover:bg-green-700 ${
        accepted ? "opacity-70 cursor-default" : ""
      }`}
      onClick={() => {
        startTransition(async () => {
          const result = await acceptRequest({}, senderUserId);
          if (result.status === "SUCCESS") {
            toast.success("Friend request accepted");
            setAccepted(true);
            onAccepted?.(); // notify parent to hide decline
          } else {
            toast.error(result.error || "Something went wrong");
          }
        });
      }}
    >
      <Check className="h-4 w-4 mr-1" />
      {accepted ? "Accepted" : isPending ? "Accepting..." : "Accept"}
    </Button>
  );
}
