import { connectToMongoDB } from "@/lib/mongodb";
import Patelian from "@/models/patelian";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { email } = await req.json();
    const patelianId = await Patelian.findOne({ email }).select("_id");
    if (patelianId) {
      return NextResponse.json({ userExists: true });
    } else {
      return NextResponse.json({ userExists: false });
    }
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
