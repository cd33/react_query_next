import { db } from "@/store/store";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await db.posts.all();
    return NextResponse.json({users}, { status: 200 });
  } catch (error) {
    console.log("error GET :>> ", error);
    return NextResponse.json("Failed getting posts", { status: 500 });
  }
}
