import { db } from "@/store/store";
import { NextResponse } from "next/server";

interface PostProps {
  params: {
    postId: string;
  };
}

export async function GET(req: Request, { params }: PostProps) {
  try {
    if (!params.postId) {
      return NextResponse.json("Missing post id", { status: 400 });
    }
    console.log("coucou");
    
    const post = await db.posts.byId(Number(params.postId));
    console.log('post :>> ', { post });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.log("error GET :>> ", error);
    return NextResponse.json("Failed getting post", { status: 500 });
  }
}
