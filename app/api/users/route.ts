import { NextResponse } from "next/server";
import { db } from "@/store/store";

export async function POST(req: Request) {
  console.log("coucou");

  try {
    const { name, email } = await req.json();
    console.log("name :>> ", name);
    console.log("email :>> ", email);
    if (!name || !email) {
      return NextResponse.json("Missing name or email", { status: 400 });
    }

    const user = await db.users.add({ name, email });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("error POST :>> ", error);
    return NextResponse.json("Failed creating user", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const users = await db.users.all();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log("error GET :>> ", error);
    return NextResponse.json("Failed getting posts", { status: 500 });
  }
}
