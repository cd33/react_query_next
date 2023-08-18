import { db } from "@/store/store";
import { NextResponse } from "next/server";

interface UserProps {
  params: {
    userId: string;
  };
}

export async function GET(req: Request, { params }: UserProps) {
  try {
    if (!params.userId) {
      return NextResponse.json("Missing user id", { status: 400 });
    }

    const posts = await db.posts.byUserId(Number(params.userId));
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.log("error GET :>> ", error);
    return NextResponse.json("Failed getting post", { status: 500 });
  }
}
