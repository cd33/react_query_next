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

    const user = await db.users.byId(Number(params.userId));
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("error GET :>> ", error);
    return NextResponse.json("Failed getting user", { status: 500 });
  }
}
