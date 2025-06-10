"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Send, Check, XCircle, MessageSquare } from "lucide-react";
import { sendRequest } from "../actions/user.actions";

interface Props { sendUserId: string; }

export function FriendRequestButton({ sendUserId }: Props) {
  const initialState = { error: "", status: "IDLE", type: "None" };
  const [state, action, isPending] = useActionState(sendRequest, initialState);

  if (state.error && state.status === "ERROR") {
    toast.error(state.error);
  }

  const label = isPending
    ? "Processing..."
    : state.type === "Sent"
      ? "Cancel Request"
      : state.type === "Received"
        ? "Accept Request"
        : state.type === "friends"
          ? "Message"
          : "Send Request";

  const icon = isPending
    ? <Loader2 className="animate-spin w-4 h-4 mr-2" />
    : state.type === "Sent"
      ? <XCircle className="w-4 h-4 mr-2" />
      : state.type === "Received"
        ? <Check className="w-4 h-4 mr-2" />
        : state.type === "friends"
          ? <MessageSquare className="w-4 h-4 mr-2" />
          : <Send className="w-4 h-4 mr-2" />;

  return state.type === "Received" || state.type === "Sent" || state.type === "friends"
    ? <Button disabled variant="outline">{icon}{label}</Button>
    : (
      <form action={() => action(sendUserId)}>
        <Button type="submit" disabled={isPending} variant="outline">
          {icon}{label}
        </Button>
      </form>
    );
}
