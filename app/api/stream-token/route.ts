import { NextResponse } from "next/server";
import { generateStreamToken } from "@/lib/stream";
import { currentUser } from "@clerk/nextjs"; // or your own auth method

export async function GET() {
  try {
    const user = await currentUser(); // Replace if you're not using Clerk

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = generateStreamToken(user.id);
    console.log("Generated Stream Token:", token);
    
    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("Error in stream-token route:", error.message);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
