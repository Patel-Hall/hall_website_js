import { connectToMongoDB } from "@/lib/mongodb";
import Hall from "@/models/hall";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const hallInfo = await Hall.findOne({});
    return NextResponse.json({ hallInfo });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
